import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useFollowUserMutation, useSeeProfileQuery, useUnfollowUserMutation } from "../generated/graphql";
import PageTitle from "../components/PageTitle";
import Avatar from "../shared/Avatar";
import MainLayout from "../shared/MainLayout";
import { Button } from "../shared/shared";
import { BsHeartFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { ApolloCache, useApolloClient } from "@apollo/client";

type ProfileParams = {
  username: string;
};

const Container = styled.section`
  margin-top: 58px;
`;

const ProfileHeader = styled.div`
  padding: 20px 70px;
  padding-bottom: 40px;
  display: flex;
`;

const ProfileImage = styled.div`
  flex: 1;
  display: flex;

  img {
    cursor: pointer;
  }
`;

const ProfileUserInfo = styled.div`
  flex: 2.4;
  padding-top: 15px;
`;

const ProfileUser = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 30px;
    font-weight: 400;
    margin-right: 40px;
  }
  a {
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 7px 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
  }
  button {
    box-sizing: border-box;
    width: 86px;
    padding: 7px 0;
    margin: 0px;
    margin-left: 7px;
  }
`;

const ProfilePost = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  max-width: 280px;

  strong {
    font-weight: 700;
    cursor: pointer;
  }
`;

const ProfileDescription = styled.div`
  h1 {
    font-weight: 600;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.4;
  }
`;

const ProfileMain = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: flex-start;
  max-width: 940px;
  width: 940px;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 30px;
`;

const ProfilePhoto = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 296px;
    height: 296px;
    vertical-align: top;
  }
`;

const BlackBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &:hover {
    opacity: 1;
  }
`;

const ProfilePhotoIcons = styled.div`
  display: flex;

  span {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: 18px;

    &:last-child {
      margin-right: 0px;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

const Profile = () => {
  const loggedInUser = useLoggedInUser();
  const { username } = useParams<ProfileParams>();
  const { data: seeProfileData, loading: seeProfileLoading } = useSeeProfileQuery({ variables: { username: username || "" } });
  const [followUserMutation, { loading: followUserLoading }] = useFollowUserMutation({
    update: (cache: ApolloCache<any>, { data }) => {
      if (data?.followUser.ok === false) {
        return;
      }
      cache.modify({
        id: `User:${seeProfileData?.seeProfile.user?.id}`,
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
  });
  const [unfollowUserMutation, { loading: unfollowUserLoading }] = useUnfollowUserMutation({
    update: (cache: ApolloCache<any>, { data }) => {
      if (data?.unfollowUser.ok === false) {
        return;
      }
      cache.modify({
        id: `User:${seeProfileData?.seeProfile.user?.id}`,
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
  });

  const handleFollowUser = (): void => {
    if (followUserLoading === true) {
      return;
    }
    followUserMutation({ variables: { username: username as string } });
  };

  const handleUnfollowUser = (): void => {
    if (unfollowUserLoading === true) {
      return;
    }
    unfollowUserMutation({ variables: { username: username as string } });
  };

  return (
    <MainLayout>
      <PageTitle title={seeProfileLoading === true ? "로딩중" : username || "페이지를 찾을 수 없습니다."} />
      {seeProfileLoading === false ? (
        <Container>
          <ProfileHeader>
            <ProfileImage>
              <Avatar avatarUrl={seeProfileData?.seeProfile.user?.avatarUrl || "/images/basic_user.jpeg"} size="155px" />
            </ProfileImage>
            <ProfileUserInfo>
              <ProfileUser>
                <span>{seeProfileData?.seeProfile.user?.username}</span>
                {seeProfileData?.seeProfile.user?.isMe === true && <Link to={`/users/${loggedInUser?.username}/edit`}>프로필 편집</Link>}
                {seeProfileData?.seeProfile.user?.isMe === false && seeProfileData.seeProfile.user.isFollowing === true && <Link to="/">메세지 보내기</Link>}
                {seeProfileData?.seeProfile.user?.isMe === false && seeProfileData.seeProfile.user.isFollowing === true && (
                  <Button onClick={handleUnfollowUser} type="button">
                    팔로우 취소
                  </Button>
                )}
                {seeProfileData?.seeProfile.user?.isMe === false && seeProfileData.seeProfile.user.isFollowing === false && (
                  <Button onClick={handleFollowUser} type="button">
                    팔로우
                  </Button>
                )}
              </ProfileUser>
              <ProfilePost>
                <span>
                  게시물 <strong>{seeProfileData?.seeProfile.user?.totalPhotos}</strong>
                </span>
                <span>
                  팔로워 <strong>{seeProfileData?.seeProfile.user?.totalFollowers}</strong>
                </span>
                <span>
                  팔로우 <strong>{seeProfileData?.seeProfile.user?.totalFollowing}</strong>
                </span>
              </ProfilePost>
              <ProfileDescription>
                <h1>{seeProfileData?.seeProfile.user?.name}</h1>
                <p>{seeProfileData?.seeProfile.user?.bio}</p>
              </ProfileDescription>
            </ProfileUserInfo>
          </ProfileHeader>
          <ProfileMain>
            {seeProfileData?.seeProfile.user?.photos?.map((photo) => (
              <ProfilePhoto key={photo?.id}>
                <BlackBackground>
                  <ProfilePhotoIcons>
                    <span>
                      <BsHeartFill />
                      {photo?.totalLikes}
                    </span>
                    <span>
                      <FaComment style={{ transform: "rotateY(180deg)" }} />
                      {photo?.totalComments}
                    </span>
                  </ProfilePhotoIcons>
                </BlackBackground>
                <img src={photo?.photoUrl} alt="" />
              </ProfilePhoto>
            ))}
          </ProfileMain>
        </Container>
      ) : null}
    </MainLayout>
  );
};

export default Profile;
