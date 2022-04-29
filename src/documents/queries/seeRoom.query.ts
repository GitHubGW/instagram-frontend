import gql from "graphql-tag";

gql`
  query SeeRoom($roomId: Int!) {
    seeRoom(roomId: $roomId) {
      ok
      message
      room {
        id
        users {
          id
          name
          username
          avatarUrl
          isFollowing
          isMe
        }
        messages {
          id
          text
          read
          createdAt
          user {
            id
            username
            avatarUrl
            isMe
          }
        }
      }
    }
  }
`;
