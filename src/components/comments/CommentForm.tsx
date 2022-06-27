import gql from "graphql-tag";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { VscSmiley } from "react-icons/vsc";
import { Reference } from "@apollo/client";
import { useCreateCommentMutation, useSeeCommentsLazyQuery } from "../../generated/graphql";

interface CommentFormProps {
  photoId?: number;
  position: string;
}

interface FormData {
  text: string;
}

interface SeeMeFragmentType {
  seeMe: { __typename: string; user: { __ref: string } };
}

const Form = styled.form`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 12px 15px;
  display: flex;
  margin-top: 20px;
`;

const Emoji = styled.div`
  position: relative;

  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  padding-left: 10px;
  margin-right: auto;
  font-size: 14px;
  width: 80%;
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

const PickerBox = styled.div<{ position: string }>`
  position: absolute;
  top: ${(props) => (props.position === "bottom" ? "30px" : "-330px")};
  left: 0px;
`;

const CommentForm = ({ photoId, position }: CommentFormProps) => {
  const [isEmoji, setIsEmoji] = useState<boolean>(false);
  const [seeCommentsLazyQuery, { loading: seeCommentsLoading }] = useSeeCommentsLazyQuery();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { text: "" } });
  const [createCommentMutation] = useCreateCommentMutation({
    update: (cache, { data }) => {
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
      if (seeCommentsLoading === false) {
        seeCommentsLazyQuery({ variables: { photoId: photoId as number } });
      }
    },
  });

  const onValid = (): void => {
    if (photoId) {
      const { text } = getValues();
      createCommentMutation({ variables: { photoId, text } });
      setIsEmoji(false);
    }
  };

  const handleShowEmoji = (): void => {
    setIsEmoji((isEmoji: boolean) => !isEmoji);
  };

  const onEmojiClick = (event: React.MouseEvent, emojiObject: any): void => {
    const { text } = getValues();
    setValue("text", text + emojiObject.emoji);
    setIsEmoji(false);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Emoji>
        <VscSmiley onClick={handleShowEmoji} />
        {isEmoji === true && (
          <PickerBox position={position}>
            <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />
          </PickerBox>
        )}
      </Emoji>
      <Input {...register("text", { required: "댓글을 입력해주세요.", minLength: 1, maxLength: 70 })} type="text" minLength={1} maxLength={70} placeholder="댓글 달기..." />
      <Button onClick={handleSubmit(onValid)} type="submit" disabled={!isValid}>
        게시
      </Button>
    </Form>
  );
};

export default CommentForm;
