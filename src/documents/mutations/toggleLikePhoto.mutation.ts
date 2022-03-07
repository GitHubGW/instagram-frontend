import gql from "graphql-tag";

gql`
  mutation ToggleLikePhoto($photoId: Int!) {
    toggleLikePhoto(photoId: $photoId) {
      ok
      message
    }
  }
`;
