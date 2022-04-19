import gql from "graphql-tag";

gql`
  mutation UploadPhoto($photo: Upload!, $caption: String) {
    uploadPhoto(photo: $photo, caption: $caption) {
      ok
      message
      photo {
        id
        user {
          id
          name
          username
          avatarUrl
        }
        photoUrl
        caption
        hashtags {
          id
          name
        }
        totalLikes
        totalComments
        isMe
        isLiked
        createdAt
      }
    }
  }
`;
