import gql from "graphql-tag";

gql`
  mutation DeleteAccount($userId: Int!) {
    deleteAccount(userId: $userId) {
      ok
      message
    }
  }
`;
