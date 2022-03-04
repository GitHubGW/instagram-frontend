import gql from "graphql-tag";

gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      message
      token
    }
  }
`;
