import gql from "graphql-tag";

gql`
  mutation DeleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
      message
      id
    }
  }
`;
