import gql from "graphql-tag";

gql`
  query SeeFeed($cursor: Int) {
    seeFeed(cursor: $cursor) {
      ok
      message
      lastPhotoId
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
