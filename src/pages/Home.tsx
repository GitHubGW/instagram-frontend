import { isDarkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";

const Container = styled.section``;

const Home = () => {
  return (
    <Container>
      <PageTitle title="홈" />
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Logout now...</button>
      <button onClick={() => isDarkModeVar(true)}>Dark Mode True</button>
      <button onClick={() => isDarkModeVar(false)}>Dark Mode False</button>
    </Container>
  );
};

export default Home;
