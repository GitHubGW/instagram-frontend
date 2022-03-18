import gql from "graphql-tag";

gql`
  mutation UnfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      message
      user {
        id
        name
        username
      }
    }
  }
`;
