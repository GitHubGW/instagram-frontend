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
          totalLikes
          totalComments
        }
        totalPhotos
      }
    }
  }
`;
