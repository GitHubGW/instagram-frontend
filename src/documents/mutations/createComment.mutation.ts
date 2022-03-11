import gql from "graphql-tag";

gql`
  mutation CreateComment($photoId: Int!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      ok
      message
      id
    }
  }
`;
