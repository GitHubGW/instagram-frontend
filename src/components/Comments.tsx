import styled from "styled-components";
import { Comment } from "../generated/graphql";
import CommentContent from "./Comment";

interface CommentsProps {
  comments: Comment[];
}

const Container = styled.div``;

const Comments = ({ comments }: CommentsProps) => {
  return (
    <Container>
      {comments.map((comment: Comment) => (
        <CommentContent key={comment.id} {...comment} />
      ))}
    </Container>
  );
};

export default Comments;
