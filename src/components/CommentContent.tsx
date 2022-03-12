import styled from "styled-components";
import { ApolloCache } from "@apollo/client";
import { Link } from "react-router-dom";
import { useDeleteCommentMutation, User } from "../generated/graphql";
import Username from "../shared/Username";

interface CommentContentProps {
  photoId?: number;
  id: number;
  text: string;
  user: User;
  isMe: boolean;
  createdAt: string;
}

const Container = styled.div`
  padding-left: 12px;
  margin-bottom: 5px;
  display: flex;
`;

const Text = styled.span`
  margin-left: 5px;
  font-size: 15px;
  margin-right: auto;
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

const CommentContent = ({ photoId, id, text, user, isMe, createdAt }: CommentContentProps) => {
  const [deleteCommentMutation, { loading: deleteCommentLoading }] = useDeleteCommentMutation({
    variables: { commentId: id },
    update: (cache: ApolloCache<any>, { data }) => {
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

  const handleDeleteComment = (): void => {
    if (deleteCommentLoading === true) {
      return;
    }
    deleteCommentMutation();
  };

  return (
    <Container>
      <Link to={`/users/${user.username}`}>
        <Username username={user.username} size="15px" />
      </Link>
      <Text>{text.length < 50 ? text : `${text.slice(0, 60)}...`}</Text>
      {isMe === true && (
        <DeleteCommentButton onClick={handleDeleteComment} type="button">
          ✕
        </DeleteCommentButton>
      )}
    </Container>
  );
};

export default CommentContent;
