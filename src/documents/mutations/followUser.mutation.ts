import gql from "graphql-tag";

gql`
  mutation FollowUser($username: String!) {
    followUser(username: $username) {
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
