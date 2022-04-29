import gql from "graphql-tag";

gql`
  mutation DeleteMessage($messageId: Int!) {
    deleteMessage(messageId: $messageId) {
      ok
      message
      id
    }
  }
`;
