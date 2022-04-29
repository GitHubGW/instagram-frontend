import gql from "graphql-tag";

gql`
  mutation ReadMessage($messageId: Int!) {
    readMessage(messageId: $messageId) {
      ok
      message
      id
    }
  }
`;
