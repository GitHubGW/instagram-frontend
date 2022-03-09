import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import Name from "../shared/Name";
import Username from "../shared/Username";

interface PhotoAuthorProps {
  name?: string | null;
  username?: string;
  avatarUrl?: string | null;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;

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
        <Avatar size="37px" avatarUrl={avatarUrl} />
      </Link>
      <Link to={`/users/${username}`}>
        <Username username={username} size="14px" />
        {name && <Name name={name} size="12px" />}
      </Link>
    </Container>
  );
};

export default PhotoAuthor;
