import gql from "graphql-tag";

gql`
  query SeeHashtag($name: String!, $cursor: Int) {
    seeHashtag(name: $name) {
      ok
      message
      hashtag {
        id
        name
        photos(cursor: $cursor) {
          id
          photoUrl
          user {
            id
            name
            username
            avatarUrl
          }
          totalLikes
          totalComments
          isLiked
          caption
          createdAt
        }
        totalPhotos
      }
    }
  }
`;
