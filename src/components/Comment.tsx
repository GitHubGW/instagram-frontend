import { ApolloCache } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDeleteCommentMutation, User } from "../generated/graphql";
import Username from "../shared/Username";

interface CommentProps {
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
`;

const Text = styled.span`
  margin-left: 5px;
  font-size: 15px;
`;

const Comment = ({ photoId, id, text, user, isMe, createdAt }: CommentProps) => {
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
      <Text>{text}</Text>
      {isMe === true && <button onClick={handleDeleteComment}>✕</button>}
    </Container>
  );
};

export default Comment;
