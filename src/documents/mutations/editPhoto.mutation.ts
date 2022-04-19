import gql from "graphql-tag";

gql`
  mutation EditPhoto($photoId: Int!, $caption: String!) {
    editPhoto(photoId: $photoId, caption: $caption) {
      ok
      message
      id
    }
  }
`;
