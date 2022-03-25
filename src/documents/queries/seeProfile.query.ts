import gql from "graphql-tag";

gql`
  query SeeProfile($username: String!, $cursor: Int) {
    seeProfile(username: $username) {
      ok
      message
      user {
        id
        name
        username
        bio
        avatarUrl
        totalFollowing
        totalFollowers
        totalPhotos
        isFollowing
        isMe
        photos(cursor: $cursor) {
          id
          user {
            id
            name
            username
            avatarUrl
          }
          photoUrl
          isLiked
          totalLikes
          totalComments
          caption
          createdAt
        }
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
