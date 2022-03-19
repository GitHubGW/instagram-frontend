import gql from "graphql-tag";

gql`
  query SearchUsers($username: String!, $cursor: String) {
    searchUsers(username: $username, cursor: $cursor) {
      ok
      message
      users {
        id
        name
        username
        avatarUrl
      }
    }
  }
`;
