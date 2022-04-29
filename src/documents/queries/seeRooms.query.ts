import gql from "graphql-tag";

gql`
  query SeeRooms {
    seeRooms {
      ok
      message
      rooms {
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
          createdAt
        }
        totalUnreadMessages
        latestMessage {
          id
          text
          createdAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
