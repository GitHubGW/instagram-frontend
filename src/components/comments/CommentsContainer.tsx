import styled from "styled-components";
import { Comment } from "../../generated/graphql";
import CommentContent from "./CommentContent";

interface CommentsContainerProps {
  photoId?: number;
  comments: Comment[];
}

const Container = styled.div``;

const CommentsContainer = ({ photoId, comments }: CommentsContainerProps) => {
  const reversedComments = [...comments].reverse().slice(0, 4);

  return (
    <Container>
      {reversedComments.map((comment: Comment) => (
        <CommentContent key={comment.id} photoId={photoId} {...comment} />
      ))}
    </Container>
  );
};

export default CommentsContainer;
