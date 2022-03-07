import styled from "styled-components";

interface UsernameProps {
  username?: string | null;
  size: string;
}

const Container = styled.span<{ size: string }>`
  font-size: ${(props) => props.size};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Username = ({ username, size }: UsernameProps) => {
  return <Container size={size}>{username}</Container>;
};

export default Username;
