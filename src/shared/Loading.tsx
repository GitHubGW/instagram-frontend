import styled from "styled-components";

interface LoadingProps {
  size: string;
}

const Image = styled.img<{ size: string }>`
  width: ${(props) => props.size};
`;

const Loading = ({ size }: LoadingProps) => {
  return <Image size={size} src="/images/loading.gif" alt="" />;
};

export default Loading;
