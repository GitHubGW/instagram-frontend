import styled from "styled-components";

interface TotalCommentsProps {
  totalComments?: number;
}

const Container = styled.div`
  padding: 12px;
  padding-top: 0px;
  padding-bottom: 8px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.grayTextColor};
  cursor: pointer;
`;

const TotalComments = ({ totalComments }: TotalCommentsProps) => {
  return <Container>댓글 {totalComments?.toLocaleString("ko-KR")}개 모두 보기</Container>;
};

export default TotalComments;
