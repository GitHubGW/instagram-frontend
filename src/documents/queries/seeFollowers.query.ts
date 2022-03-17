import gql from "graphql-tag";

export const SEE_FOLLOWERS = gql`
  query SeeFollowers($username: String!, $cursor: String) {
    seeFollowers(username: $username, cursor: $cursor) {
      ok
      message
      followers {
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
