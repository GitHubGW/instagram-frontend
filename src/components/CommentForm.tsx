import gql from "graphql-tag";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { VscSmiley } from "react-icons/vsc";
import { useCreateCommentMutation } from "../generated/graphql";
import { ApolloCache, Reference } from "@apollo/client";

interface CommentFormProps {
  photoId?: number;
}

interface FormData {
  text: string;
}

interface SeeMeFragmentType {
  seeMe: { __typename: string; user: { __ref: string } };
}

const Form = styled.form`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 12px;
  display: flex;
  margin-top: 15px;
`;

const Emoji = styled.div`
  margin-right: 10px;

  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  padding-left: 10px;
  margin-right: auto;
  font-size: 14px;
  width: 86%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.bgContainerColor};
  color: ${(props) => props.theme.textColor};

  &::placeholder {
    font-size: 14px;
    color: ${(props) => props.theme.grayTextColor};
  }
`;

const Button = styled.button`
  color: ${(props) => (props.disabled === true ? props.theme.inactiveColor : props.theme.activeColor)};
  font-size: 14px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

const CommentForm = ({ photoId }: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { text: "" } });
  const [createCommentMutation, { loading: createCommentLoading }] = useCreateCommentMutation({
    update: (cache: ApolloCache<any>, { data }) => {
      if (data?.createComment.ok === false) {
        return;
      }

      const { text } = getValues();
      setValue("text", "");

      const seeMeFragmentType: SeeMeFragmentType | null = cache.readFragment({
        id: "ROOT_QUERY",
        fragment: gql`
          fragment query on Query {
            seeMe {
              user
            }
          }
        `,
      });
      const commentReference: Reference | undefined = cache.writeFragment({
        fragment: gql`
          fragment comment on Comment {
            id
            text
            user
            isMe
            createdAt
          }
        `,
        data: {
          __typename: "Comment",
          id: data?.createComment.id,
          text,
          user: seeMeFragmentType?.seeMe.user,
          isMe: true,
          createdAt: String(Date.now()),
        },
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments: (comments) => [...comments, commentReference],
          totalComments: (totalComments: number): number => totalComments + 1,
        },
      });
    },
  });

  const onValid = () => {
    if (createCommentLoading === true) {
      return;
    }
    if (photoId) {
      const { text } = getValues();
      createCommentMutation({ variables: { photoId, text } });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Emoji>
        <VscSmiley />
      </Emoji>
      <Input {...register("text", { required: "댓글을 입력해주세요.", minLength: 1, maxLength: 70 })} type="text" minLength={1} maxLength={70} placeholder="댓글 달기..." />
      <Button onClick={handleSubmit(onValid)} type="submit" disabled={!isValid}>
        게시
      </Button>
    </Form>
  );
};

export default CommentForm;
