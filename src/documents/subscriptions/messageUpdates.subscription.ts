import gql from "graphql-tag";

gql`
  subscription MessageUpdates($roomId: Int!) {
    messageUpdates(roomId: $roomId) {
      id
      text
      read
      user {
        id
        name
        username
        email
        avatarUrl
      }
      room {
        id
        totalUnreadMessages
        latestMessage {
          id
          text
        }
      }
    }
  }
`;
