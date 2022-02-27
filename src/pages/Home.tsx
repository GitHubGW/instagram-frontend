import { isDarkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Logout now...</button>

      <button onClick={() => isDarkModeVar(true)}>Dark Mode True</button>
      <button onClick={() => isDarkModeVar(false)}>Dark Mode False</button>
    </Container>
  );
};

export default Home;
