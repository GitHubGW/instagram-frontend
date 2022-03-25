import gql from "graphql-tag";

gql`
  query SeeComments($photoId: Int!, $cursor: Int) {
    seeComments(photoId: $photoId, cursor: $cursor) {
      ok
      message
      comments {
        id
        text
        user {
          id
          username
          avatarUrl
          isMe
        }
        isMe
        createdAt
      }
    }
  }
`;
