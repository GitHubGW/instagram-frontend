import styled, { keyframes } from "styled-components";
import Avatar from "../shared/Avatar";
import Username from "../shared/Username";
import SearchUser from "./users/SearchUser";
import SearchPhoto from "./photos/SearchPhoto";
import SearchHashtag from "./hashtags/SearchHashtag";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, Location } from "react-router-dom";
import { ScrollBox } from "../shared/shared";
import { MdLogout } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApolloClient, useApolloClient, useReactiveVar } from "@apollo/client";
import { BsPlusSquare, BsPlusSquareFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { handleDisableDarkMode, handleEnableDarkMode, handleLogout, isDarkModeVar, isLoggedInVar } from "../apollo";
import { useFollowUpdatesSubscription, useSearchHashtagsLazyQuery, useSearchPhotosLazyQuery, useSearchUsersLazyQuery } from "../generated/graphql";

interface SearchedUser {
  __typename?: "User";
  id: number;
  name?: string | null;
  username: string;
  avatarUrl?: string | null;
}

interface SearchedHashtag {
  __typename?: "Hashtag";
  id: number;
  name: string;
  totalPhotos?: number | null;
}

interface SearchedPhoto {
  __typename?: "Photo";
  id: number;
  photoUrl: string;
  user: { __typename?: "User"; id: number; username: string };
  totalLikes?: number | null;
  totalComments?: number | null;
}

interface FormData {
  keyword: string;
}

const likeAnimation = keyframes`
  0% {
    opacity:1;
    transform:scale(1);
  }
  15% {
    opacity:0.9;
    transform:scale(1.3);
  }
  30% {
    transform:scale(.95);
  }
  45%, 80% {
    opacity:0.9;
    transform:scale(1);
  }
`;

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

  p {
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

const LoginNav = styled.nav`
  width: 280px;
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

const HeartContainer = styled.div`
  position: relative;
  height: 24px;
  margin-left: 3px;
  cursor: pointer;

  &.animation {
    animation-name: ${likeAnimation};
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
  }
`;

const HeartAlram = styled.span`
  width: 4px;
  height: 4px;
  display: inline-block;
  border-radius: 50px;
  background-color: tomato;
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translate(-50%);
`;

const HeartModalContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
  width: 340px;
  height: 250px;
  overflow-y: auto;
  max-height: 250px;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 100;
  border-radius: 5px;
  border: 1px solid gray;
`;

const HeartModal = styled.div``;

const AlramContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
`;

const NoHeartModalContainer = styled(HeartModalContainer)`
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 14px;
  }
`;

const AlramUserContainer = styled.div`
  margin-left: 10px;
`;

const AlramUserSpan = styled.span`
  font-size: 14px;
`;

const Header = () => {
  const heartAlram = useRef<HTMLDivElement>(null);
  const loggedInUser = useLoggedInUser();
  const location: Location = useLocation();
  const client: ApolloClient<object> = useApolloClient();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);
  const { register, handleSubmit, watch } = useForm<FormData>({ mode: "onChange", defaultValues: { keyword: "" } });
  const [heartClicked, setHeartClicked] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<(SearchedUser | null)[]>([]);
  const [searchedHashtags, setSearchedHashtags] = useState<(SearchedHashtag | null)[]>([]);
  const [searchedPhotos, setSearchedPhotos] = useState<(SearchedPhoto | null)[]>([]);
  const [searchUsersLazyQuery, { loading: searchUsersLoading }] = useSearchUsersLazyQuery();
  const [searchHashtagsLazyQuery, { loading: searchHashtagsLoading }] = useSearchHashtagsLazyQuery();
  const [searchPhotosLazyQuery, { loading: searchPhotosLoading }] = useSearchPhotosLazyQuery();
  const { data: followUpdatesData } = useFollowUpdatesSubscription({ variables: { userId: loggedInUser?.id as number } });

  const onValid = (): void => {};

  const handleHeartClick = () => {
    setHeartClicked((heartClicked) => !heartClicked);
  };

  useEffect(() => {
    if (followUpdatesData && heartAlram.current) {
      heartAlram.current.classList.add("animation");
    }
  }, [followUpdatesData]);

  return (
    <Container>
      <Content>
        <Logo to={"/"}>
          <img src="/images/instagram_logo.svg" alt="instagram_logo" />
        </Logo>
        <SearchForm onSubmit={handleSubmit(onValid)}>
          {watch("keyword") !== "" && (
            <SearchModal>
              {searchedUsers.length === 0 && searchedHashtags.length === 0 && searchedPhotos.length === 0 ? (
                <p>
                  @이름, #해시태그를 이용해서 <br />
                  유저, 해시태그를 검색해보세요.
                </p>
              ) : null}
              {searchedUsers.map((searchedUser: SearchedUser | null) => (
                <SearchUser key={searchedUser?.id} {...searchedUser} />
              ))}
              {searchedHashtags.map((searchedHashtag: SearchedHashtag | null) => (
                <SearchHashtag key={searchedHashtag?.id} {...searchedHashtag} />
              ))}
              {/* 
              {searchedPhotos.map((searchedPhoto: SearchedPhoto | null) => (
                <SearchPhoto key={searchedPhoto?.id} {...searchedPhoto} />
              ))} 
              */}
            </SearchModal>
          )}
          <SearchInput
            {...register("keyword", {
              required: "키워드를 입력해주세요",
              minLength: 1,
              maxLength: 30,
              validate: {
                // 유저 검색
                searchingUser: async (keyword: string): Promise<boolean> => {
                  if (keyword.match(/@\w/g) !== null && searchUsersLoading === false) {
                    const replacedUsername: string = keyword.replaceAll("@", "");
                    const { data } = await searchUsersLazyQuery({ variables: { username: replacedUsername } });
                    if (data?.searchUsers?.users && data?.searchUsers.ok === true) {
                      setSearchedUsers(data.searchUsers.users);
                    }
                  } else {
                    setSearchedUsers([]);
                  }
                  return true;
                },
                // 해시태그 검색
                searchingHashtag: async (keyword: string): Promise<boolean> => {
                  if (keyword.match(/#\w/g) !== null && searchHashtagsLoading === false) {
                    const replacedHashtag: string = keyword.replaceAll("#", "");
                    const { data } = await searchHashtagsLazyQuery({ variables: { name: replacedHashtag } });
                    if (data?.searchHashtags?.hashtags && data?.searchHashtags.ok === true) {
                      setSearchedHashtags(data.searchHashtags.hashtags);
                    }
                  } else {
                    setSearchedHashtags([]);
                  }
                  return true;
                },
                /*
                // 사진 검색
                searchingPhoto: async (keyword: string): Promise<boolean> => {
                  if (keyword.match(/@\w/g) === null && keyword.match(/#\w/g) === null && searchPhotosLoading === false) {
                    const { data } = await searchPhotosLazyQuery({ variables: { keyword } });
                    if (data?.searchPhotos?.photos && data?.searchPhotos.ok === true) {
                      setSearchedPhotos(data.searchPhotos.photos);
                    }
                  } else {
                    setSearchedPhotos([]);
                  }
                  return true;
                },
                */
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
            <Link to={"/"}>{location.pathname === "/" ? <IoHomeSharp /> : <IoHomeOutline />}</Link>
            <Link to={"photos/upload"}>{location.pathname.includes("/photos/upload") === true ? <BsPlusSquareFill /> : <BsPlusSquare />}</Link>
            <HeartContainer ref={heartAlram}>
              {heartClicked === true ? (
                <BsHeartFill onClick={handleHeartClick} style={{ color: "rgb(237, 73, 86)" }} />
              ) : followUpdatesData ? (
                <BsHeartFill onClick={handleHeartClick} style={{ color: "rgb(237, 73, 86)" }} />
              ) : (
                <BsHeart onClick={handleHeartClick} />
              )}
              {followUpdatesData ? <HeartAlram></HeartAlram> : null}
              {heartClicked === true && followUpdatesData ? (
                <HeartModalContainer>
                  <HeartModal>
                    <AlramContainer>
                      <Avatar size="44px" avatarUrl={followUpdatesData?.followUpdates?.avatarUrl || "/images/basic_user.jpeg"} />
                      <Link to={`/users/${followUpdatesData.followUpdates?.username}`}>
                        <AlramUserContainer>
                          <Username size="15px" username={followUpdatesData?.followUpdates?.username || ""} textDecoration={"false"} />
                          <AlramUserSpan>님이 회원님을 팔로우하기 시작했습니다.</AlramUserSpan>
                        </AlramUserContainer>
                      </Link>
                    </AlramContainer>
                  </HeartModal>
                </HeartModalContainer>
              ) : null}
              {heartClicked === true && followUpdatesData === undefined ? (
                <NoHeartModalContainer>
                  <h3>새로운 알림이 없습니다.</h3>
                </NoHeartModalContainer>
              ) : null}
            </HeartContainer>
            <Link to={`/users/${loggedInUser?.username}`}>
              {isLoggedIn === true ? <Avatar size="30px" avatarUrl={loggedInUser?.avatarUrl || "/images/basic_user.jpeg"} /> : <FontAwesomeIcon icon={faUser} />}
            </Link>
            <MdLogout onClick={() => handleLogout(client)} style={{ cursor: "pointer" }} />
            <DarkModeButton onClick={isDarkMode === true ? handleDisableDarkMode : handleEnableDarkMode} type="button">
              {isDarkMode === true ? <FiSun /> : <FiMoon />}
            </DarkModeButton>
          </LoginNav>
        ) : (
          <LogoutNav>
            <LoginLink to={"/login"}>
              <span>로그인</span>
            </LoginLink>
            <SignupLink to={"/signup"}>
              <span>가입하기</span>
            </SignupLink>
          </LogoutNav>
        )}
      </Content>
    </Container>
  );
};

export default Header;
