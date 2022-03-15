import gql from "graphql-tag";

gql`
  mutation EditProfile($name: String, $username: String, $email: String, $password: String, $bio: String, $avatar: Upload) {
    editProfile(name: $name, username: $username, email: $email, password: $password, bio: $bio, avatar: $avatar) {
      ok
      message
    }
  }
`;
