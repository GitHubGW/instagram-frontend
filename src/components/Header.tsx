import styled from "styled-components";
import routes from "../routes";
import useLoggedInUser from "../hooks/useLoggedInUser";
import Avatar from "../shared/Avatar";
import { Link, useLocation, Location } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleDisableDarkMode, handleEnableDarkMode, isDarkModeVar, isLoggedInVar } from "../apollo";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { HiOutlineHashtag } from "react-icons/hi";
import { FaRegCompass, FaCompass } from "react-icons/fa";
import { IoHomeOutline, IoHomeSharp, IoPaperPlaneOutline, IoPaperPlaneSharp } from "react-icons/io5";
import { BsPlusSquare, BsPlusSquareFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiSun, FiMoon } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSearchHashtagsLazyQuery, useSearchUsersLazyQuery } from "../generated/graphql";
import { useState } from "react";
import Username from "../shared/Username";
import Name from "../shared/Name";
import { ScrollBox } from "../shared/shared";

interface SearchedUsers {
  __typename?: "User";
  id: number;
  name?: string | null;
  username: string;
  avatarUrl?: string | null;
}

interface SearchedHashtags {
  __typename?: "Hashtag";
  id: number;
  name: string;
  totalPhotos?: number | null;
}

interface FormData {
  keyword: string;
}

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
  display: flex;

  img {
    width: 105px;
    cursor: pointer;
  }
`;

const SearchForm = styled.form`
  width: 250px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.searchBgColor};
  color: ${(props) => props.theme.grayTextColor};
  padding: 11px 15px;
  border-radius: 8px;
  &::placeholder {
    font-size: 14px;
    color: ${(props) => props.theme.grayTextColor};
  }
`;

const SearchModal = styled(ScrollBox)`
  width: 370px;
  height: 350px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  position: absolute;
  top: 43px;
  left: -68px;
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow-y: scroll;
  padding: 10px 0;

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.5;
    color: ${(props) => props.theme.grayTextColor};
    font-size: 14px;
    font-weight: 400;
    width: 230px;
    text-align: center;
  }
  a {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    padding-right: 0;
    &:hover {
      background-color: ${(props) => props.theme.bgColor};
    }
    img {
      margin-right: 13px;
    }
    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

const SearchHashtagInfo = styled.div`
  h2 {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;
  }
  h3 {
    font-size: 15px;
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

const HashtagIcon = styled.div`
  width: 47px;
  height: 47px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-right: 13px;
`;

const Header = () => {
  const [searchedUsers, setSearchedUsers] = useState<(SearchedUsers | null)[]>([]);
  const [searchedHashtags, setSearchedHashtags] = useState<(SearchedHashtags | null)[]>([]);
  const loggedInUser = useLoggedInUser();
  const location: Location = useLocation();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);
  const { register, handleSubmit, watch } = useForm<FormData>({ mode: "onChange", defaultValues: { keyword: "" } });
  const [searchUsersLazyQuery, { loading: searchUsersLoading }] = useSearchUsersLazyQuery();
  const [searchHashtagsLazyQuery, { loading: searchHashtagsLoading }] = useSearchHashtagsLazyQuery();

  const onValid = (): void => {};

  return (
    <Container>
      <Content>
        <Logo to={routes.home}>
          <img src="/images/instagram_logo.svg" alt="instagram_logo" />
        </Logo>
        <SearchForm onSubmit={handleSubmit(onValid)}>
          {watch("keyword") !== "" && (
            <SearchModal>
              {watch("keyword").match(/@\w/g) === null && watch("keyword").match(/#\w/g) === null ? (
                <h1>
                  @이름, #해시태그, 텍스트를 이용해서 <br />
                  유저, 해시태그, 사진을 검색해보세요.
                </h1>
              ) : null}
              {searchedUsers.map((searchedUser: SearchedUsers | null) => (
                <Link key={searchedUser?.id} to={`/users/${searchedUser?.username}`}>
                  <Avatar size="47px" avatarUrl={searchedUser?.avatarUrl} />
                  <div>
                    <Username size="15px" username={searchedUser?.username} textDecoration={"false"} />
                    <Name size="14px" name={searchedUser?.name} />
                  </div>
                </Link>
              ))}
              {searchedHashtags.map((searchedHashtag: SearchedHashtags | null) => (
                <Link key={searchedHashtag?.id} to={`/hashtags/${searchedHashtag?.name.replaceAll("#", "")}`}>
                  <HashtagIcon>
                    <HiOutlineHashtag />
                  </HashtagIcon>
                  <SearchHashtagInfo>
                    <h2>{searchedHashtag?.name}</h2>
                    <h3>게시물 {searchedHashtag?.totalPhotos}</h3>
                  </SearchHashtagInfo>
                </Link>
              ))}
            </SearchModal>
          )}
          <SearchInput
            {...register("keyword", {
              required: "키워드를 입력해주세요",
              minLength: 1,
              maxLength: 30,
              validate: {
                searchingUser: async (keyword: string): Promise<boolean> => {
                  if (keyword.match(/@\w/g) !== null && searchUsersLoading === false) {
                    const replacedUsername: string = keyword.replaceAll("@", "");
                    const { data } = await searchUsersLazyQuery({ variables: { username: replacedUsername } });
                    if (data?.searchUsers?.users && data?.searchUsers.ok === true) {
                      setSearchedUsers(data?.searchUsers?.users);
                    }
                  } else {
                    setSearchedUsers([]);
                  }
                  return true;
                },
                searchingHashtag: async (keyword: string): Promise<boolean> => {
                  if (keyword.match(/#\w/g) !== null && searchHashtagsLoading === false) {
                    const replacedHashtag: string = keyword.replaceAll("#", "");
                    const { data } = await searchHashtagsLazyQuery({ variables: { name: replacedHashtag } });
                    if (data?.searchHashtags?.hashtags && data?.searchHashtags.ok === true) {
                      setSearchedHashtags(data?.searchHashtags?.hashtags);
                    }
                  } else {
                    setSearchedHashtags([]);
                  }
                  return true;
                },
              },
            })}
            minLength={1}
            maxLength={30}
            type="text"
            placeholder="검색"
          />
        </SearchForm>
        {isLoggedIn === true ? (
          <LoginNav>
            <Link to={routes.home}>{location.pathname === routes.home ? <IoHomeSharp /> : <IoHomeOutline />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <IoPaperPlaneSharp /> : <IoPaperPlaneOutline />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <BsPlusSquareFill /> : <BsPlusSquare />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <FaCompass /> : <FaRegCompass />}</Link>
            <Link to={"/"}>{location.pathname === routes.home ? <BsHeartFill /> : <BsHeart />}</Link>
            <Link to={`/users/${loggedInUser?.username}`}>
              {isLoggedIn === true ? <Avatar size="26px" avatarUrl={loggedInUser?.avatarUrl || "/images/basic_user.jpeg"} /> : <FontAwesomeIcon icon={faUser} />}
            </Link>
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
