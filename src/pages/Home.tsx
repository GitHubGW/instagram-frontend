import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import Name from "../shared/Name";
import UploadPhoto from "./UploadPhoto";
import Username from "../shared/Username";
import FeedLayout from "../shared/FeedLayout";
import PageTitle from "../components/PageTitle";
import useLoggedInUser from "../hooks/useLoggedInUser";
import PhotoContainer from "../components/photos/PhotoContainer";
import { useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link, PathMatch, useMatch } from "react-router-dom";
import { SEE_FOLLOWERS } from "../documents/queries/seeFollowers.query";
import { SEE_FOLLOWING } from "../documents/queries/seeFollowing.query";
import { useFollowUserMutation, useSeeFeedQuery, useSeeFollowingQuery, useSeeRecommendPhotosQuery, useSeeRecommendUsersQuery, useUnfollowUserMutation } from "../generated/graphql";

const Container = styled.section`
  background-color: ${(props) => props.theme.bgColor};
  position: relative;
  display: flex;
  margin-top: 90px;
  margin-bottom: 250px;
`;

const LeftContainer = styled.div`
  max-width: 620px;
  width: 100%;
  height: 300px;
`;

const RightContainer = styled.div`
  max-width: 280px;
  width: 100%;
  margin-top: 15px;
  box-sizing: border-box;
  margin-left: 30px;
`;

const AsideContent = styled.div`
  position: fixed;
  max-width: 280px;
`;

const NavContent = styled.div`
  span {
    color: ${(props) => props.theme.lightGrayTextColor};
    font-size: 13px;
    font-weight: 400;
    margin: 0 1px;
  }
`;

const Nav = styled.nav`
  margin-bottom: 15px;

  ul {
    max-width: 310px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li {
      margin-bottom: 2px;
      a {
        color: ${(props) => props.theme.lightGrayTextColor};
        font-size: 12px;
      }
    }
  }
`;

const AsideHeader = styled.div`
  display: flex;
  align-items: center;
`;

const AsideMain = styled.div``;

const AsideMainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;

  h1 {
    font-size: 14px;
    color: ${(props) => props.theme.grayTextColor};
    font-weight: bold;
  }
  a {
    font-size: 12px;
  }
`;

const AsideMainInner = styled.div`
  margin-top: 20px;
  margin-bottom: 35px;
`;

const RecommandContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 13px;
  margin-right: auto;
`;

const FollowButton = styled.button<{ isFollowing: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  color: ${(props) => (props.isFollowing === true ? props.theme.textColor : props.theme.activeColor)};
`;

const FollowingContainer = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};

  .slick-prev {
    z-index: 50;
    &::before {
      position: relative;
      left: 15px;
      color: gray;
    }
  }
  .slick-next {
    z-index: 50;
    &::before {
      position: relative;
      right: 15px;
      color: gray;
    }
  }
  .slick-slide {
    max-width: 65px;
    margin-right: 15px;
  }
  a {
    max-width: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 17px;
    text-align: center;
    &:last-child {
      margin-right: 0;
    }
    h1 {
      margin-top: 7px;
      font-size: 14px;
    }
  }
`;

const Home = () => {
  let followUsername: string | undefined;
  let unfollowUsername: string | undefined;
  const uploadPhotoPathMath: PathMatch<string> | null = useMatch("/photos/upload");
  const loggedInUser = useLoggedInUser();
  const { data: seeFeedData, fetchMore } = useSeeFeedQuery();
  const { data: seeFollowingData } = useSeeFollowingQuery({ variables: { username: loggedInUser?.username || "" } });
  const { data: seeRecommendUsersData } = useSeeRecommendUsersQuery();
  const { data: seeRecommendPhotosData } = useSeeRecommendPhotosQuery();

  const [followUserMutation] = useFollowUserMutation({
    update: (cache, { data }) => {
      if (data?.followUser.ok === false) {
        return;
      }

      followUsername = data?.followUser.user?.username;
      cache.modify({
        id: `User:${data?.followUser.user?.id}`,
        fields: {
          isFollowing: (isFollowing: boolean) => true,
          totalFollowers: (totalFollowers: number) => totalFollowers + 1,
        },
      });
      cache.modify({
        id: `User:${loggedInUser?.id}`,
        fields: {
          totalFollowing: (totalFollowing: number) => totalFollowing + 1,
        },
      });
    },
    refetchQueries: [
      { query: SEE_FOLLOWERS, variables: { username: followUsername } },
      { query: SEE_FOLLOWING, variables: { username: loggedInUser?.username } },
    ],
  });
  const [unfollowUserMutation] = useUnfollowUserMutation({
    update: (cache, { data }) => {
      if (data?.unfollowUser.ok === false) {
        return;
      }

      unfollowUsername = data?.unfollowUser.user?.username;
      cache.modify({
        id: `User:${data?.unfollowUser.user?.id}`,
        fields: {
          isFollowing: (isFollowing: boolean) => false,
          totalFollowers: (totalFollowers: number) => totalFollowers - 1,
        },
      });
      cache.modify({
        id: `User:${loggedInUser?.id}`,
        fields: {
          totalFollowing: (totalFollowing: number) => totalFollowing - 1,
        },
      });
    },
    refetchQueries: [
      { query: SEE_FOLLOWERS, variables: { username: unfollowUsername } },
      { query: SEE_FOLLOWING, variables: { username: loggedInUser?.username } },
    ],
  });
  const sliderSettings = {
    infinite: false,
    speed: 300,
    slidesToShow: (seeFollowingData?.seeFollowing.following?.length as number) < 7 ? seeFollowingData?.seeFollowing.following?.length : 7,
    slidesToScroll: 2,
  };

  const handleToggleFollow = (isFollowing: boolean | undefined, username: string | undefined): void => {
    if (isFollowing === false) {
      followUserMutation({ variables: { username: username as string } });
    } else if (isFollowing === true) {
      unfollowUserMutation({ variables: { username: username as string } });
    }
  };

  const handleScroll = useCallback(async (): Promise<void> => {
    const scrollTop: number = document.documentElement.scrollTop;
    const innerHeight: number = window.innerHeight;
    const scrollHeight: number = document.body.scrollHeight;

    if (seeFeedData?.seeFeed.lastPhotoId === null) {
      return;
    }
    if (scrollTop + innerHeight >= scrollHeight) {
      await fetchMore({ variables: { cursor: seeFeedData?.seeFeed.lastPhotoId } });
    }
  }, [fetchMore, seeFeedData?.seeFeed.lastPhotoId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <FeedLayout>
      <AnimatePresence>{uploadPhotoPathMath && uploadPhotoPathMath.pathname === "/photos/upload" && <UploadPhoto />}</AnimatePresence>
      <Container>
        <PageTitle title="홈" />
        <LeftContainer>
          {seeFollowingData?.seeFollowing.following === null || seeFollowingData?.seeFollowing.following?.length === 0 ? null : (
            <FollowingContainer>
              <Slider {...sliderSettings}>
                {seeFollowingData?.seeFollowing?.following?.map((following) => (
                  <Link key={following?.id} to={`/users/${following?.username}`}>
                    <Avatar size="65px" avatarUrl={following?.avatarUrl || "/images/basic_user.jpeg"} />
                    <h1>{following?.username}</h1>
                  </Link>
                ))}
              </Slider>
            </FollowingContainer>
          )}
          {seeRecommendPhotosData?.seeRecommendPhotos.photos?.map((photo) => (
            <PhotoContainer key={photo?.id} {...photo} />
          ))}
          {seeFeedData?.seeFeed.photos?.map((photo) => (
            <PhotoContainer key={photo?.id} {...photo} />
          ))}
          <br />
        </LeftContainer>
        <RightContainer>
          <AsideContent>
            <AsideHeader>
              <Link to={`/users/${loggedInUser?.username}`}>
                <Avatar size="55px" avatarUrl={loggedInUser?.avatarUrl || "/images/basic_user.jpeg"} />
              </Link>
              <UserInfo>
                <Link to={`/users/${loggedInUser?.username}`}>
                  <Username username={loggedInUser?.username} size="16px" textDecoration={"false"} />
                </Link>
                <Name name={loggedInUser?.name} size="14px" />
              </UserInfo>
            </AsideHeader>
            <AsideMain>
              <AsideMainHeader>
                <h1>회원님을 위한 추천</h1>
                <Link to="/users/all">
                  <span>모두 보기</span>
                </Link>
              </AsideMainHeader>
              <AsideMainInner>
                {seeRecommendUsersData?.seeRecommendUsers.users?.map((user) => (
                  <RecommandContent key={user?.id}>
                    <Link to={`/users/${user?.username}`}>
                      <Avatar size="32px" avatarUrl={user?.avatarUrl || "/images/basic_user.jpeg"} />
                    </Link>
                    <UserInfo>
                      <Link to={`/users/${user?.username}`}>
                        <Username username={user?.username} size="14px" textDecoration={"false"} />
                      </Link>
                      <Name name={user?.name} size="12px" />
                    </UserInfo>
                    <FollowButton onClick={() => handleToggleFollow(user?.isFollowing, user?.username)} isFollowing={user?.isFollowing || false} type="button">
                      {user?.isFollowing === true ? "팔로잉" : "팔로우"}
                    </FollowButton>
                  </RecommandContent>
                ))}
              </AsideMainInner>
            </AsideMain>
            <NavContent>
              <Nav>
                <ul>
                  <li>
                    <a href="https://about.instagram.com" target="_blank" rel="noreferrer">
                      소개
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://help.instagram.com" target="_blank" rel="noreferrer">
                      도움말
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://about.instagram.com/blog" target="_blank" rel="noreferrer">
                      홍보 센터
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://developers.facebook.com/docs/instagram" target="_blank" rel="noreferrer">
                      API
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://about.instagram.com/about-us/careers" target="_blank" rel="noreferrer">
                      채용 정보
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0" target="_blank" rel="noreferrer">
                      개인정보처리방침
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://help.instagram.com/581066165581870" target="_blank" rel="noreferrer">
                      약관
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://www.instagram.com/explore/locations" target="_blank" rel="noreferrer">
                      위치
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://www.instagram.com/directory/profiles" target="_blank" rel="noreferrer">
                      인기 계정
                    </a>
                  </li>
                  <span>∙</span>
                  <li>
                    <a href="https://www.instagram.com/directory/hashtags" target="_blank" rel="noreferrer">
                      해시태그
                    </a>
                  </li>
                </ul>
              </Nav>
              <span>© {new Date().getFullYear()} INSTAGRAM FROM META</span>
            </NavContent>
          </AsideContent>
        </RightContainer>
      </Container>
    </FeedLayout>
  );
};

export default Home;
