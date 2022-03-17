import gql from "graphql-tag";

export const SEE_FOLLOWING = gql`
  query SeeFollowing($username: String!, $cursor: String) {
    seeFollowing(username: $username, cursor: $cursor) {
      ok
      message
      following {
        id
        name
        username
        avatarUrl
        isFollowing
        isMe
      }
    }
  }
`;
