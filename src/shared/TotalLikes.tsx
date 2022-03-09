import styled from "styled-components";

interface TotalLikesProps {
  totalLikes?: number;
}

const Container = styled.div`
  padding: 12px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const TotalLikes = ({ totalLikes }: TotalLikesProps) => {
  return <Container>좋아요 {totalLikes?.toLocaleString("ko-KR")}개</Container>;
};

export default TotalLikes;
