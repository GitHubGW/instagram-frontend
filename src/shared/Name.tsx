import styled from "styled-components";

interface NameProps {
  name?: string | null;
  size: string;
}

const Container = styled.span<{ size: string }>`
  font-size: ${(props) => props.size};
  margin-top: 3px;
  color: ${(props) => props.theme.grayTextColor};
  font-weight: normal;
`;

const Name = ({ name, size }: NameProps) => {
  return <Container size={size}>{name}</Container>;
};

export default Name;
