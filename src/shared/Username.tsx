import styled from "styled-components";

interface UsernameProps {
  username?: string | null;
  size: string;
  textDecoration: string;
}

const Container = styled.span<{ size: string; textDecoration: string }>`
  font-size: ${(props) => props.size};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: ${(props) => (props.textDecoration === "true" ? "underline" : "none")};
  }
`;

const Username = ({ username, size, textDecoration }: UsernameProps) => {
  return (
    <Container size={size} textDecoration={textDecoration}>
      {username}
    </Container>
  );
};

export default Username;
