import gql from "graphql-tag";

gql`
  query SeeUsers {
    seeUsers {
      ok
      message
      users {
        id
        username
        avatarUrl
        isFollowing
        name
        email
        bio
        isMe
        following {
          id
          name
          username
          avatarUrl
          isFollowing
        }
        followers {
          id
          name
          username
          avatarUrl
          isFollowing
        }
      }
    }
  }
`;
