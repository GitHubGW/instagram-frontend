import { Link } from "react-router-dom";
import styled from "styled-components";
import { User } from "../generated/graphql";
import Username from "../shared/Username";

interface CommentProps {
  id: number;
  text: string;
  user: User;
  isMe: boolean;
  createdAt: string;
}

const Container = styled.div`
  padding-left: 12px;
  margin-bottom: 3px;
`;

const Text = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

const Comment = ({ id, text, user, isMe, createdAt }: CommentProps) => {
  return (
    <Container>
      <Link to={`/users/${user.username}`}>
        <Username username={user.username} size="15px" />
      </Link>
      <Text>{text}</Text>
    </Container>
  );
};

export default Comment;
