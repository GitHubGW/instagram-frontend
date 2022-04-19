import gql from "graphql-tag";

gql`
  mutation DeletePhoto($photoId: Int!) {
    deletePhoto(photoId: $photoId) {
      ok
      message
      id
    }
  }
`;
