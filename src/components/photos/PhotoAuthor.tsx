import styled from "styled-components";
import Name from "../../shared/Name";
import Avatar from "../../shared/Avatar";
import Username from "../../shared/Username";
import { Link } from "react-router-dom";

interface PhotoAuthorProps {
  name?: string | null;
  username?: string;
  avatarUrl?: string | null;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;

  a:last-child {
    display: flex;
    flex-direction: column;
  }
  span {
    margin-left: 12px;
  }
`;

const PhotoAuthor = ({ name, username, avatarUrl }: PhotoAuthorProps) => {
  return (
    <Container>
      <Link to={`/users/${username}`}>
        <Avatar size="37px" avatarUrl={avatarUrl || "/images/basic_user.jpeg"} />
      </Link>
      <Link to={`/users/${username}`}>
        <Username username={username} size="14px" textDecoration={"false"} />
        {name && <Name name={name} size="12px" />}
      </Link>
    </Container>
  );
};

export default PhotoAuthor;
