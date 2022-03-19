import gql from "graphql-tag";

gql`
  query SearchHashtags($name: String!) {
    searchHashtags(name: $name) {
      ok
      message
      hashtags {
        id
        name
        totalPhotos
      }
    }
  }
`;
