import gql from "graphql-tag";

gql`
  query SeeFeed($cursor: Int) {
    seeFeed(cursor: $cursor) {
      ok
      message
      photos {
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
        comments {
          id
          text
          user {
            id
            username
            avatarUrl
          }
          isMe
          createdAt
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
