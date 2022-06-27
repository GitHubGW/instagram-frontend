import styled from "styled-components";
import Name from "./Name";
import Avatar from "./Avatar";
import Username from "./Username";
import Loading from "./Loading";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ScrollBox } from "../shared/shared";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { SEE_FOLLOWERS } from "../documents/queries/seeFollowers.query";
import { SEE_FOLLOWING } from "../documents/queries/seeFollowing.query";
import { useFollowUserMutation, useSeePhotoLikesQuery, useUnfollowUserMutation } from "../generated/graphql";

interface TotalLikesProps {
  photoId?: number;
  totalLikes?: number;
}

const modalVariants: Variants = {
  start: { opacity: 0, scale: 0.95, translateX: "-50%", translateY: "-50%" },
  end: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const Container = styled.div`
  padding: 12px 15px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  height: 42px;
  max-height: 42px;
`;

const LikesUser = styled.div`
  display: flex;

  img {
    margin-right: 8px;
  }
`;

const LikesOtherUsers = styled.div`
  font-weight: normal;
  cursor: auto;

  span {
    font-weight: 600;
    cursor: pointer;
  }
`;

const LikesText = styled.div``;

const ModalLikeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled(motion.div)`
  position: fixed;
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
  z-index: 120;
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

const ModalMain = styled(ScrollBox)`
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

const TotalLikes = ({ photoId, totalLikes }: TotalLikesProps) => {
  let followUsername: string | undefined;
  let unfollowUsername: string | undefined;
  const loggedInUser = useLoggedInUser();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { data: seePhotoLikesData } = useSeePhotoLikesQuery({ variables: { photoId: photoId as number } });
  const [followUserMutation, { loading: followUserLoading }] = useFollowUserMutation({
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

  const handleSeePhotoLikes = (): void => {
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
  };

  const handleCloseModal = (): void => {
    document.body.style.overflow = "auto";
    setModalIsOpen(false);
  };

  const handleToggleFollow = (isFollowing: boolean | undefined, username: string | undefined): void => {
    if (isFollowing === false) {
      followUserMutation({ variables: { username: username as string } });
    } else if (isFollowing === true) {
      unfollowUserMutation({ variables: { username: username as string } });
    }
  };

  return (
    <Container>
      {modalIsOpen === true && <ModalLikeBackground onClick={handleCloseModal} />}
      <AnimatePresence>
        {modalIsOpen === true ? (
          <ModalBox variants={modalVariants} initial="start" animate="end" exit="exit">
            <ModalHeader>
              <h1>좋아요</h1>
              <button onClick={handleCloseModal}>✕</button>
            </ModalHeader>
            <ModalMain>
              {seePhotoLikesData &&
                seePhotoLikesData?.seePhotoLikes?.users?.map((user) => (
                  <ModalMainContent key={user?.id}>
                    <ModalMainUser>
                      <Link to={`/users/${user?.username}`} onClick={() => setModalIsOpen(false)}>
                        <Avatar size="38px" avatarUrl={user?.avatarUrl || "/images/basic_user.jpeg"} />
                        <ModalMainUserInfo>
                          <Username size="15px" username={user?.username} textDecoration={"true"} />
                          <Name size="14px" name={user?.name} />
                        </ModalMainUserInfo>
                      </Link>
                    </ModalMainUser>
                    {user?.isMe === false && (
                      <FollowButton isFollowing={user?.isFollowing} onClick={() => handleToggleFollow(user?.isFollowing, user?.username)} type="button">
                        {followUserLoading === true ? <Loading size="12px" /> : user?.isFollowing === true ? "팔로잉" : "팔로우"}
                      </FollowButton>
                    )}
                  </ModalMainContent>
                ))}
            </ModalMain>
          </ModalBox>
        ) : null}
      </AnimatePresence>
      {totalLikes && totalLikes >= 2 ? (
        <LikesUser>
          <div onClick={handleSeePhotoLikes}>
            <Avatar size="20px" avatarUrl={(seePhotoLikesData?.seePhotoLikes.users && seePhotoLikesData?.seePhotoLikes.users[0]?.avatarUrl) || "/images/basic_user.jpeg"} />
          </div>
          <Link to={`/users/${seePhotoLikesData?.seePhotoLikes.users && seePhotoLikesData?.seePhotoLikes.users[0]?.username}`}>
            <Username size="14px" username={seePhotoLikesData?.seePhotoLikes.users && seePhotoLikesData?.seePhotoLikes.users[0]?.username} textDecoration={"true"} />
          </Link>
          <LikesOtherUsers>
            님 <span onClick={handleSeePhotoLikes}>외 {(totalLikes - 1).toLocaleString("ko-KR")}명</span>이 좋아합니다.
          </LikesOtherUsers>
        </LikesUser>
      ) : (
        <LikesText onClick={handleSeePhotoLikes}>좋아요 {totalLikes?.toLocaleString("ko-KR")}개</LikesText>
      )}
    </Container>
  );
};

export default TotalLikes;
