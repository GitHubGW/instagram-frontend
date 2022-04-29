import gql from "graphql-tag";

gql`
  mutation SendMessage($text: String, $roomId: Int, $userId: Int) {
    sendMessage(text: $text, roomId: $roomId, userId: $userId) {
      ok
      message
      room {
        id
      }
      id
    }
  }
`;
