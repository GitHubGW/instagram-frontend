import { handleLogout, isDarkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useReactiveVar } from "@apollo/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Container = styled.section``;

const Home = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Container>
      <PageTitle title="홈" />
      <Header />
      <h1>Home / {isLoggedIn === true ? "로그인 됨" : "로그인 안됨"}</h1>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={() => isDarkModeVar(true)}>Dark Mode True</button>
      <button onClick={() => isDarkModeVar(false)}>Dark Mode False</button>
      <Footer />
    </Container>
  );
};

export default Home;
