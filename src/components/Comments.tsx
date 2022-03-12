import styled from "styled-components";
import { Comment } from "../generated/graphql";
import CommentContent from "./Comment";

interface CommentsProps {
  photoId?: number;
  comments: Comment[];
}

const Container = styled.div``;

const Comments = ({ photoId, comments }: CommentsProps) => {
  return (
    <Container>
      {comments.map((comment: Comment) => (
        <CommentContent key={comment.id} photoId={photoId} {...comment} />
      ))}
    </Container>
  );
};

export default Comments;
