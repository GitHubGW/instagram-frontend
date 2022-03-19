import gql from "graphql-tag";

gql`
  query SearchPhotos($keyword: String!, $cursor: Int) {
    searchPhotos(keyword: $keyword, cursor: $cursor) {
      ok
      message
      photos {
        id
        photoUrl
        user {
          id
          username
        }
        totalLikes
        totalComments
      }
    }
  }
`;
