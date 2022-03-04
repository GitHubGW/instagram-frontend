import { useReactiveVar } from "@apollo/client";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { handleDisableDarkMode, handleEnableDarkMode, isDarkModeVar } from "../apollo";

const Container = styled.header``;

const DarkModeButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

const Header = () => {
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);

  return (
    <Container>
      <h1>Header</h1>
      <DarkModeButton onClick={isDarkMode === true ? handleDisableDarkMode : handleEnableDarkMode}>
        <FontAwesomeIcon icon={isDarkMode === true ? faSun : faMoon} />
      </DarkModeButton>
    </Container>
  );
};

export default Header;
