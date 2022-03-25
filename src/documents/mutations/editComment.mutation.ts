import gql from "graphql-tag";

gql`
  mutation EditComment($commentId: Int!, $text: String!) {
    editComment(commentId: $commentId, text: $text) {
      ok
      message
      id
    }
  }
`;
