import gql from "graphql-tag";

gql`
  query SeeFollowing($username: String!, $cursor: String) {
    seeFollowing(username: $username, cursor: $cursor) {
      ok
      message
      following {
        id
        username
        avatarUrl
      }
    }
  }
`;
