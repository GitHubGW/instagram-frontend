import { Link, useLocation, Location } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleDisableDarkMode, handleEnableDarkMode, isDarkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import routes from "../routes";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import useLoggedInUser from "../hooks/useLoggedInUser";
import Avatar from "../shared/Avatar";
import { FaRegCompass, FaCompass } from "react-icons/fa";
import { IoHomeOutline, IoHomeSharp, IoPaperPlaneOutline, IoPaperPlaneSharp } from "react-icons/io5";
import { BsPlusSquare, BsPlusSquareFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";

const Container = styled.header`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.headerColor};
  width: 100%;
  position: fixed;
  z-index: 100;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.contentMaxWidth};
  width: ${(props) => props.theme.contentMaxWidth};
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
  font-size: 24px;

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
  font-size: 24px;
  margin: 0;
  padding: 0;
  display: flex;
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
            <Link to={routes.home}>{location.pathname === routes.home ? <IoHomeSharp /> : <IoHomeOutline />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <IoPaperPlaneSharp /> : <IoPaperPlaneOutline />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <BsPlusSquareFill /> : <BsPlusSquare />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <FaCompass /> : <FaRegCompass />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <BsHeartFill /> : <BsHeart />}</Link>
            <Link to={"/"}>{isLoggedIn === true ? <Avatar size="26px" avatarUrl={loggedInUser?.avatarUrl} /> : <FontAwesomeIcon icon={faUser} />}</Link>
            <DarkModeButton onClick={isDarkMode === true ? handleDisableDarkMode : handleEnableDarkMode} type="button">
              {isDarkMode === true ? <FiSun /> : <FiMoon />}
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
