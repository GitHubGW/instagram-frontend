import gql from "graphql-tag";

gql`
  query SeeMe {
    seeMe {
      ok
      message
      user {
        id
        name
        username
        email
        avatarUrl
        bio
        isMe
      }
    }
  }
`;
