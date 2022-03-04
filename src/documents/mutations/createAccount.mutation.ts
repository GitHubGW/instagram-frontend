import gql from "graphql-tag";

gql`
  mutation CreateAccount($email: String!, $name: String, $username: String!, $password: String!) {
    createAccount(email: $email, name: $name, username: $username, password: $password) {
      ok
      message
    }
  }
`;
