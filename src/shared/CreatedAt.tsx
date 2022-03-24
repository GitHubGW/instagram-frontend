import "moment/locale/ko";
import moment from "moment";
import styled from "styled-components";

interface CreatedAtProps {
  createdAt?: string | number;
}

const Container = styled.span`
  color: ${(props) => props.theme.grayTextColor};
  font-size: 11px;
  padding: 12px 15px;
`;

const CreatedAt = ({ createdAt = "" }: CreatedAtProps) => {
  const parsedCreatedAt: string = moment(new Date(+createdAt), "YYYYMMDD").fromNow();
  return <Container>{parsedCreatedAt}</Container>;
};

export default CreatedAt;
