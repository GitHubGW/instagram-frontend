import styled from "styled-components";

interface TotalCommentsProps {
  totalComments?: number;
  handleOpenPhotoDetail: () => void;
}

const Container = styled.div`
  padding: 8px 15px;
  padding-top: 0px;
  padding-bottom: 8px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.grayTextColor};
  cursor: pointer;
`;

const TotalComments = ({ totalComments, handleOpenPhotoDetail }: TotalCommentsProps) => {
  return <Container onClick={handleOpenPhotoDetail}>댓글 {totalComments?.toLocaleString("ko-KR")}개 모두 보기</Container>;
};

export default TotalComments;
