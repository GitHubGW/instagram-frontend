import gql from "graphql-tag";

gql`
  query SeeRecommendUsers {
    seeRecommendUsers {
      ok
      message
      users {
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
