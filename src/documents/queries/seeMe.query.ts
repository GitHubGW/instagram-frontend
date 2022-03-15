import gql from "graphql-tag";

export const SEE_ME = gql`
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
