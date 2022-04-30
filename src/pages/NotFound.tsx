import styled from "styled-components";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import MainLayout from "../shared/MainLayout";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 90px;
  text-align: center;

  h1 {
    font-size: 22px;
    line-height: 1.6;
    font-weight: 600;
  }
  p {
    margin: 0;
    margin-top: 30px;
    a {
      color: #00376b;
    }
  }
`;

const NotFound = () => {
  return (
    <MainLayout>
      <PageTitle title="페이지를 찾을 수 없습니다" />
      <Container>
        <h1>죄송합니다. 페이지를 사용할 수 없습니다.</h1>
        <p>
          클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다. <Link to="/">Instagram으로 돌아가기.</Link>
        </p>
      </Container>
      <Footer />
    </MainLayout>
  );
};

export default NotFound;
