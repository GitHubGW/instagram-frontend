import gql from "graphql-tag";

gql`
  query SeePhoto($photoId: Int!) {
    seePhoto(photoId: $photoId) {
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
        totalLikes
        totalComments
        isMe
        isLiked
        createdAt
        hashtags {
          id
          name
        }
        comments {
          id
          text
          user {
            id
            username
            avatarUrl
          }
          isMe
        }
      }
    }
  }
`;
