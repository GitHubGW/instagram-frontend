import gql from "graphql-tag";

gql`
  subscription LikeUpdates($photoId: Int!) {
    likeUpdates(photoId: $photoId) {
      id
      photo {
        id
        photoUrl
      }
      user {
        id
        username
        avatarUrl
      }
      createdAt
    }
  }
`;
