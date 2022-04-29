import gql from "graphql-tag";

gql`
  subscription CommentUpdates($photoId: Int!) {
    commentUpdates(photoId: $photoId) {
      id
      text
      user {
        id
        name
        username
        email
        avatarUrl
      }
      photo {
        id
        photoUrl
        caption
        totalLikes
        totalComments
        isMe
        isLiked
      }
      isMe
      createdAt
    }
  }
`;
