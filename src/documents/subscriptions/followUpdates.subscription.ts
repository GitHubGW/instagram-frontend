import gql from "graphql-tag";

gql`
  subscription FollowUpdates($userId: Int!) {
    followUpdates(userId: $userId) {
      id
      name
      username
      email
      avatarUrl
      totalFollowing
      totalFollowers
      totalPhotos
      isFollowing
      isMe
      createdAt
      updatedAt
    }
  }
`;
