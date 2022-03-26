import gql from "graphql-tag";

gql`
  query SeeRecommendPhotos {
    seeRecommendPhotos {
      ok
      message
      photos {
        id
        photoUrl
        caption
        totalLikes
        totalComments
        isMe
        isLiked
        createdAt
        user {
          id
          name
          username
          avatarUrl
        }
        hashtags {
          id
          name
        }
        comments {
          id
          text
          isMe
          createdAt
          user {
            id
            username
            avatarUrl
          }
        }
      }
    }
  }
`;
