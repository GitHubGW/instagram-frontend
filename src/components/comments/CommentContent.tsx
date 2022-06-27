import styled from "styled-components";
import Username from "../../shared/Username";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDeleteCommentMutation, useEditCommentMutation, User } from "../../generated/graphql";

interface CommentContentProps {
  photoId?: number;
  id: number;
  text: string;
  user: User;
  isMe: boolean;
  createdAt: string;
}

interface FormData {
  text: string;
}

const Container = styled.div`
  padding-left: 15px;
  margin-bottom: 5px;
  display: flex;
`;

const Text = styled.span`
  margin-left: 5px;
  font-size: 15px;
  margin-right: auto;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const EditCommentButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  padding: 0;
  margin-right: 2px;
  margin-top: 2px;
`;

const DeleteCommentButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  margin-right: 12px;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
`;

const Form = styled.form`
  width: 100%;
  margin-left: 5px;
  position: relative;
`;

const Input = styled.input`
  width: 97%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 13px 12px;
  padding-right: 65px;
  border-radius: 5px;
  font-size: 13px;
  color: ${(props) => props.theme.textColor};

  &::placeholder {
    font-size: 13px;
  }
`;

const EditingCommentButton = styled.button`
  position: absolute;
  top: 8px;
  right: 25px;
  border: none;
  color: white;
  text-align: center;
  padding: 5px 8px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? props.theme.inactiveColor : props.theme.activeColor)};
`;

const CommentContent = ({ photoId, id, text, user, isMe }: CommentContentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { text } });
  const [deleteCommentMutation] = useDeleteCommentMutation({
    variables: { commentId: id },
    update: (cache, { data }) => {
      if (data?.deleteComment.ok === false) {
        return;
      }

      cache.evict({ id: `Comment:${id}` });
      cache.gc();
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          totalComments: (totalComments: number) => totalComments - 1,
        },
      });
    },
  });
  const [editCommentMutation] = useEditCommentMutation({
    update: (cache, { data }) => {
      if (data?.editComment.ok === false) {
        return;
      }

      const { text } = getValues();
      cache.modify({
        id: `Comment:${id}`,
        fields: {
          text: () => text,
        },
      });
      setIsEditing(false);
    },
  });

  const onValid = (): void => {
    const { text } = getValues();
    editCommentMutation({ variables: { commentId: id, text } });
  };

  const handleEditComment = (): void => {
    setIsEditing((isEditing: boolean) => {
      return !isEditing;
    });
  };

  const handleDeleteComment = (): void => {
    deleteCommentMutation();
  };

  return (
    <div>
      {isMe === true && isEditing === true ? (
        <Container>
          <Link to={`/users/${user.username}`}>
            <Username username={user.username} size="15px" textDecoration={"true"} />
          </Link>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("text", { required: "댓글을 입력해주세요.", minLength: 1, maxLength: 70 })}
              minLength={1}
              maxLength={70}
              type="text"
              placeholder="댓글을 입력해주세요."
            />
            <EditingCommentButton disabled={!isValid} type="submit">
              수정
            </EditingCommentButton>
          </Form>
          <Buttons>
            <EditCommentButton onClick={handleEditComment} type="button">
              <HiOutlinePencilAlt />
            </EditCommentButton>
            <DeleteCommentButton onClick={handleDeleteComment} type="button">
              ✕
            </DeleteCommentButton>
          </Buttons>
        </Container>
      ) : (
        <Container>
          <Link to={`/users/${user.username}`}>
            <Username username={user.username} size="15px" textDecoration={"true"} />
          </Link>
          <Text>{text.length < 50 ? text : `${text.slice(0, 38)}...`}</Text>
          {isMe === true && (
            <Buttons>
              <EditCommentButton onClick={handleEditComment} type="button">
                <HiOutlinePencilAlt />
              </EditCommentButton>
              <DeleteCommentButton onClick={handleDeleteComment} type="button">
                ✕
              </DeleteCommentButton>
            </Buttons>
          )}
        </Container>
      )}
    </div>
  );
};

export default CommentContent;
