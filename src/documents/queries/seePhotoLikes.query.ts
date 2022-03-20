import gql from "graphql-tag";

export const SEE_PHOTO_LIKES = gql`
  query SeePhotoLikes($photoId: Int!, $cursor: String) {
    seePhotoLikes(photoId: $photoId, cursor: $cursor) {
      ok
      message
      users {
        id
        name
        username
        avatarUrl
        isFollowing
        isMe
      }
    }
  }
`;
