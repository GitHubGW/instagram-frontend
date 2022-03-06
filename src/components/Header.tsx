import { Link, useLocation, Location } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleDisableDarkMode, handleEnableDarkMode, isDarkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import routes from "../routes";
import {
  faSun,
  faMoon,
  faPaperPlane as faPaperPlaneRegular,
  faSquarePlus as faSquarePlusRegular,
  faCompass as faCompassRegular,
  faHeart as faHeartRegular,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faHouseCrack,
  faPaperPlane as faPaperPlaneSolid,
  faSquarePlus as faSquarePlusSolid,
  faCompass as faCompassSolid,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import useLoggedInUser from "../hooks/useLoggedInUser";
import Avatar from "../shared/Avatar";

const Container = styled.header`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.headerColor};
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.containerMaxWidth};
  width: ${(props) => props.theme.containerMaxWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const Logo = styled(Link)`
  width: 250px;

  img {
    width: 100px;
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  width: 250px;

  input {
    width: 100%;
    background-color: ${(props) => props.theme.grayTextColor};
    background-color: #efefef;
    padding: 11px 15px;
    border-radius: 8px;

    &::placeholder {
      font-size: 14px;
      color: ${(props) => props.theme.grayTextColor};
    }
  }
`;

const LoginNav = styled.nav`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;

  a {
    color: inherit;
    display: flex;
  }
`;

const LogoutNav = styled.nav`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 22px;

  a {
    color: inherit;
    &:last-child {
      margin-left: 25px;
    }
  }
`;

const DarkModeButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 22px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.textColor};
`;

const LoginLink = styled(Link)`
  background-color: ${(props) => props.theme.activeColor};
  padding: 7px 20px;
  border-radius: 5px;

  span {
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
`;

const SignupLink = styled(Link)`
  span {
    color: ${(props) => props.theme.activeColor};
    font-size: 14px;
    font-weight: bold;
  }
`;

const Header = () => {
  const location: Location = useLocation();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);
  const loggedInUser = useLoggedInUser();

  return (
    <Container>
      <Content>
        <Logo to={routes.home}>
          <img src="/images/instagram_logo.png" alt="instagram_logo" />
        </Logo>
        <SearchBar>
          <input name="keyword" type="text" placeholder="검색" />
        </SearchBar>
        {isLoggedIn === true ? (
          <LoginNav>
            <Link to={"/"}>
              <FontAwesomeIcon icon={location.pathname === "/" ? faHouse : faHouseCrack} />
            </Link>
            <Link to={"/"}>
              <FontAwesomeIcon icon={location.pathname === "/" ? faPaperPlaneSolid : faPaperPlaneRegular} />
            </Link>
            <Link to={"/"}>
              <FontAwesomeIcon icon={location.pathname === "/" ? faSquarePlusSolid : faSquarePlusRegular} />
            </Link>
            <Link to={"/"}>
              <FontAwesomeIcon icon={location.pathname === "/" ? faCompassSolid : faCompassRegular} />
            </Link>
            <Link to={"/"}>
              <FontAwesomeIcon icon={location.pathname === "/" ? faHeartSolid : faHeartRegular} />
            </Link>
            <Link to={"/"}>{isLoggedIn === true ? <Avatar size="26px" avatarUrl={loggedInUser?.avatarUrl} /> : <FontAwesomeIcon icon={faUser} />}</Link>
            <DarkModeButton onClick={isDarkMode === true ? handleDisableDarkMode : handleEnableDarkMode} type="button">
              <FontAwesomeIcon icon={isDarkMode === true ? faSun : faMoon} />
            </DarkModeButton>
          </LoginNav>
        ) : (
          <LogoutNav>
            <LoginLink to={routes.login}>
              <span>로그인</span>
            </LoginLink>
            <SignupLink to={routes.signup}>
              <span>가입하기</span>
            </SignupLink>
          </LogoutNav>
        )}
      </Content>
    </Container>
  );
};

export default Header;
