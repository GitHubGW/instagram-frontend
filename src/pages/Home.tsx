import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useSeeFeedQuery, useSeeFollowingQuery } from "../generated/graphql";
import FeedLayout from "../shared/FeedLayout";
import Avatar from "../shared/Avatar";
import useLoggedInUser from "../hooks/useLoggedInUser";
import Username from "../shared/Username";
import Name from "../shared/Name";
import PhotoContainer from "../components/PhotoContainer";

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 3,
};

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

const FollowButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  color: ${(props) => props.theme.activeColor};
`;

const FollowingContainer = styled.div`
  padding: 15px;
  display: flex;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};

  .slick-prev {
    z-index: 100;
    &::before {
      position: relative;
      left: 15px;
      color: gray;
    }
  }
  .slick-next {
    z-index: 100;
    &::before {
      position: relative;
      right: 15px;
      color: gray;
    }
  }
  div {
    width: 100%;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 17px;
      max-width: 65px;
      text-align: center;
      &:last-child {
        margin-right: 0;
      }

      h1 {
        margin-top: 7px;
        font-size: 14px;
      }
    }
  }
`;

const Home = () => {
  const loggedInUser = useLoggedInUser();
  const { data: seeFeedData } = useSeeFeedQuery();
  const { data: seeFollowingData } = useSeeFollowingQuery({ variables: { username: loggedInUser?.username || "" } });

  return (
    <FeedLayout>
      <Container>
        <PageTitle title="홈" />
        <LeftContainer>
          <FollowingContainer>
            <Slider {...sliderSettings}>
              {seeFollowingData?.seeFollowing?.following?.map((following) => (
                <Link key={following?.id} to={`/users/${following?.username}`}>
                  <Avatar size="65px" avatarUrl={following?.avatarUrl} />
                  <h1>{following?.username}</h1>
                </Link>
              ))}
            </Slider>
          </FollowingContainer>
          {seeFeedData?.seeFeed.photos?.map((photo) => (
            <PhotoContainer key={photo?.id} {...photo} />
          ))}
        </LeftContainer>
        <RightContainer>
          <AsideContent>
            <AsideHeader>
              <Link to={`/users/${loggedInUser?.username}`}>
                <Avatar size="55px" avatarUrl={loggedInUser?.avatarUrl} />
              </Link>
              <UserInfo>
                <Link to={`/users/${loggedInUser?.username}`}>
                  <Username username={loggedInUser?.username} size="16px" />
                </Link>
                <Name name={loggedInUser?.name} size="14px" />
              </UserInfo>
            </AsideHeader>
            <AsideMain>
              <AsideMainHeader>
                <h1>회원님을 위한 추천</h1>
                <Link to="/">
                  <span>모두 보기</span>
                </Link>
              </AsideMainHeader>
              <AsideMainInner>
                <RecommandContent>
                  <Link to={`/users/${loggedInUser?.username}`}>
                    <Avatar size="32px" avatarUrl={loggedInUser?.avatarUrl} />
                  </Link>
                  <UserInfo>
                    <Link to={`/users/${loggedInUser?.username}`}>
                      <Username username={loggedInUser?.username} size="14px" />
                    </Link>
                    <Name name={loggedInUser?.name} size="12px" />
                  </UserInfo>
                  <FollowButton type="button">팔로우</FollowButton>
                </RecommandContent>
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
