import styled from "styled-components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Avatar from "../shared/Avatar";
import MainLayout from "../shared/MainLayout";
import { Button } from "../shared/shared";
import { BsHeartFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { ApolloCache, useApolloClient } from "@apollo/client";
import Modal from "react-modal";
import { useState } from "react";
import Username from "../shared/Username";
import Name from "../shared/Name";
import Loading from "../shared/Loading";
import { SEE_FOLLOWERS } from "../documents/queries/seeFollowers.query";
import { SEE_FOLLOWING } from "../documents/queries/seeFollowing.query";
import { useFollowUserMutation, useSeeFollowersLazyQuery, useSeeFollowersQuery, useSeeFollowingQuery, useSeeProfileQuery, useUnfollowUserMutation } from "../generated/graphql";

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

  span {
    cursor: pointer;

    strong {
      font-weight: 700;
    }
  }
  span:first-child {
    cursor: auto;
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
  padding: 30px 0px;
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

const ModalBox = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  box-sizing: border-box;
  outline: none;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 12px 0;

  h1 {
    font-weight: 600;
    font-size: 16px;
  }
  button {
    position: absolute;
    top: 5px;
    right: 4px;
    font-size: 22px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: ${(props) => props.theme.bgContainerColor};
    color: ${(props) => props.theme.textColor};
  }
`;

const ModalMain = styled.div`
  padding: 10px 18px;
  padding-bottom: 0;
  overflow-y: scroll;
  height: 355px;
`;

const ModalMainContent = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ModalMainUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  a {
    display: flex;
    align-items: center;
  }
`;

const ModalMainUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13px;
`;

const FollowButton = styled(Button)<{ isFollowing: boolean | undefined }>`
  width: 60px;
  height: 32px;
  text-align: center;
  background-color: ${(props) => (props.isFollowing === true ? "white" : props.theme.activeColor)};
  color: ${(props) => (props.isFollowing === true ? "gray" : "white")};
  border: 1px solid ${(props) => (props.isFollowing === true ? props.theme.borderColor : "transparent")};
`;

const Profile = () => {
  const loggedInUser = useLoggedInUser();
  const { username } = useParams<ProfileParams>();
  const [modalState, setModalState] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { data: seeProfileData, loading: seeProfileLoading } = useSeeProfileQuery({ variables: { username: username || "" } });
  const [seeFollowersLazyQuery] = useSeeFollowersLazyQuery();
  const { data: seeFollowersData } = useSeeFollowersQuery({ variables: { username: username || "" } });
  const { data: seeFollowingData } = useSeeFollowingQuery({ variables: { username: username || "" } });
  const [followUserMutation, { data: followUserData, loading: followUserLoading }] = useFollowUserMutation({
    update: (cache: ApolloCache<any>, { data }) => {
      if (data?.followUser.ok === false) {
        return;
      }

      if (data?.followUser.user?.username === username) {
        cache.modify({
          id: `User:${seeProfileData?.seeProfile.user?.id}`,
          fields: {
            isFollowing: (isFollowing: boolean) => true,
            totalFollowers: (totalFollowers: number) => totalFollowers + 1,
          },
        });
      } else {
        seeFollowersLazyQuery({ variables: { username: data?.followUser.user?.username as string } });
        cache.modify({
          id: `User:${data?.followUser.user?.id}`,
          fields: {
            isFollowing: (isFollowing: boolean) => true,
            totalFollowers: (totalFollowers: number) => totalFollowers + 1,
          },
        });
      }

      cache.modify({
        id: `User:${loggedInUser?.id}`,
        fields: {
          totalFollowing: (totalFollowing: number) => totalFollowing + 1,
        },
      });
    },
    refetchQueries: [
      { query: SEE_FOLLOWERS, variables: { username } },
      { query: SEE_FOLLOWING, variables: { username: loggedInUser?.username } },
    ],
  });
  const [unfollowUserMutation, { data: unfollowUserData, loading: unfollowUserLoading }] = useUnfollowUserMutation({
    update: (cache: ApolloCache<any>, { data }) => {
      if (data?.unfollowUser.ok === false) {
        return;
      }

      if (data?.unfollowUser.user?.username === username) {
        cache.modify({
          id: `User:${seeProfileData?.seeProfile.user?.id}`,
          fields: {
            isFollowing: (isFollowing: boolean) => false,
            totalFollowers: (totalFollowers: number) => totalFollowers - 1,
          },
        });
      } else {
        seeFollowersLazyQuery({ variables: { username: data?.unfollowUser.user?.username as string } });
        cache.modify({
          id: `User:${data?.unfollowUser.user?.id}`,
          fields: {
            isFollowing: (isFollowing: boolean) => false,
            totalFollowers: (totalFollowers: number) => totalFollowers - 1,
          },
        });
      }

      cache.modify({
        id: `User:${loggedInUser?.id}`,
        fields: {
          totalFollowing: (totalFollowing: number) => totalFollowing - 1,
        },
      });
    },
    refetchQueries: [
      { query: SEE_FOLLOWERS, variables: { username } },
      { query: SEE_FOLLOWING, variables: { username: loggedInUser?.username } },
    ],
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

  const handleSeeFollowers = (): void => {
    document.body.style.overflow = "hidden";
    setModalState("follower");
    setModalIsOpen(true);
  };

  const handleSeeFollowing = (): void => {
    document.body.style.overflow = "hidden";
    setModalState("following");
    setModalIsOpen(true);
  };

  const handleToggleFollow = (isFollowing: boolean | undefined, username: string | undefined) => {
    if (isFollowing === false) {
      followUserMutation({ variables: { username: username as string } });
    } else if (isFollowing === true) {
      unfollowUserMutation({ variables: { username: username as string } });
    }
  };

  const handleAfterOpenModal = () => {};

  const handleCloseModal = (): void => {
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
  };

  // <button onClick={handleLogout} type="button">로그아웃</button>

  return (
    <MainLayout>
      <ModalBox ariaHideApp={false} isOpen={modalIsOpen} onAfterOpen={handleAfterOpenModal} onRequestClose={handleCloseModal} contentLabel="Example Modal">
        <ModalHeader>
          <h1>{modalState === "follower" ? "팔로워" : "팔로잉"}</h1>
          <button onClick={handleCloseModal}>✕</button>
        </ModalHeader>
        <ModalMain>
          {modalState === "follower" &&
            seeFollowersData?.seeFollowers.followers?.map((follower) => (
              <ModalMainContent key={follower?.id}>
                <ModalMainUser>
                  <Link to={`/users/${follower?.username}`} onClick={() => setModalIsOpen(false)}>
                    <Avatar size="38px" avatarUrl={follower?.avatarUrl} />
                    <ModalMainUserInfo>
                      <Username size="15px" username={follower?.username} />
                      <Name size="14px" name={follower?.name} />
                    </ModalMainUserInfo>
                  </Link>
                </ModalMainUser>
                {follower?.isMe === false && (
                  <FollowButton isFollowing={follower?.isFollowing} onClick={() => handleToggleFollow(follower?.isFollowing, follower?.username)} type="button">
                    {followUserLoading === true && followUserData?.followUser.user?.username === follower?.username ? (
                      <Loading size="12px" />
                    ) : follower?.isFollowing === true ? (
                      "팔로잉"
                    ) : (
                      "팔로우"
                    )}
                  </FollowButton>
                )}
              </ModalMainContent>
            ))}
          {modalState === "following" &&
            seeFollowingData?.seeFollowing.following?.map((following) => (
              <ModalMainContent key={following?.id}>
                <ModalMainUser>
                  <Link to={`/users/${following?.username}`} onClick={() => setModalIsOpen(false)}>
                    <Avatar size="38px" avatarUrl={following?.avatarUrl} />
                    <ModalMainUserInfo>
                      <Username size="15px" username={following?.username} />
                      <Name size="14px" name={following?.name} />
                    </ModalMainUserInfo>
                  </Link>
                </ModalMainUser>
                {following?.isMe === false && (
                  <FollowButton isFollowing={following?.isFollowing} onClick={() => handleToggleFollow(following?.isFollowing, following?.username)} type="button">
                    {followUserLoading === true && followUserData?.followUser.user?.username === following?.username ? (
                      <Loading size="12px" />
                    ) : following?.isFollowing === true ? (
                      "팔로잉"
                    ) : (
                      "팔로우"
                    )}
                  </FollowButton>
                )}
              </ModalMainContent>
            ))}
        </ModalMain>
      </ModalBox>
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
                    {unfollowUserLoading === true && unfollowUserData?.unfollowUser.user?.username === username ? <Loading size="12px" /> : "팔로우 취소"}
                  </Button>
                )}
                {seeProfileData?.seeProfile.user?.isMe === false && seeProfileData.seeProfile.user.isFollowing === false && (
                  <Button onClick={handleFollowUser} type="button">
                    {followUserLoading === true && followUserData?.followUser.user?.username === username ? <Loading size="12px" /> : "팔로우"}
                  </Button>
                )}
              </ProfileUser>
              <ProfilePost>
                <span>
                  게시물 <strong>{seeProfileData?.seeProfile.user?.totalPhotos}</strong>
                </span>
                <span onClick={handleSeeFollowers}>
                  팔로워 <strong>{seeProfileData?.seeProfile.user?.totalFollowers}</strong>
                </span>
                <span onClick={handleSeeFollowing}>
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
