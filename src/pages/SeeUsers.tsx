import styled from "styled-components";
import Name from "../shared/Name";
import Avatar from "../shared/Avatar";
import Loading from "../shared/Loading";
import Username from "../shared/Username";
import MainLayout from "../shared/MainLayout";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { Link } from "react-router-dom";
import { Button } from "../shared/shared";
import { SEE_FOLLOWING } from "../documents/queries/seeFollowing.query";
import { useFollowUserMutation, useSeeFollowersLazyQuery, useSeeUsersQuery, useUnfollowUserMutation } from "../generated/graphql";

const LoadingContainer = styled.section`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  margin-top: 90px;
`;

const Container = styled.section`
  background-color: ${(props) => props.theme.bgColor};
  position: relative;
  display: flex;
  width: 600px;
  max-width: 600px;
  margin: 90px auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
  }
`;

const UsersContainer = styled.div`
  padding: 15px 15px;
  margin-top: 10px;
  background-color: ${(props) => props.theme.bgContainerColor};
`;

const MainContent = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const MainUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  a {
    display: flex;
    align-items: center;
  }
`;

const MainUserInfo = styled.div`
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

const SeeUsers = () => {
  const loggedInUser = useLoggedInUser();
  const { data: seeUsersData, loading: seeUsersLoading } = useSeeUsersQuery();
  const [seeFollowersLazyQuery] = useSeeFollowersLazyQuery();
  const [followUserMutation] = useFollowUserMutation({
    update: (cache, { data }) => {
      if (data?.followUser.ok === false) {
        return;
      }

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
      seeFollowersLazyQuery({ variables: { username: data?.followUser.user?.username as string } });
    },
    refetchQueries: [{ query: SEE_FOLLOWING, variables: { username: loggedInUser?.username } }],
  });
  const [unfollowUserMutation] = useUnfollowUserMutation({
    update: (cache, { data }) => {
      if (data?.unfollowUser.ok === false) {
        return;
      }

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
      seeFollowersLazyQuery({ variables: { username: data?.unfollowUser.user?.username as string } });
    },
    refetchQueries: [{ query: SEE_FOLLOWING, variables: { username: loggedInUser?.username } }],
  });

  const handleToggleFollow = (isFollowing: boolean | undefined, username: string | undefined): void => {
    if (isFollowing === false) {
      followUserMutation({ variables: { username: username as string } });
    } else if (isFollowing === true) {
      unfollowUserMutation({ variables: { username: username as string } });
    }
  };

  return (
    <MainLayout>
      {seeUsersLoading === true ? (
        <LoadingContainer>
          <Loading size="16px" />
        </LoadingContainer>
      ) : (
        <Container>
          <h1>추천</h1>
          <UsersContainer>
            {seeUsersData?.seeUsers.users?.map((user) => (
              <MainContent key={user?.id}>
                <MainUser>
                  <Link to={`/users/${user?.username}`}>
                    <Avatar size="38px" avatarUrl={user?.avatarUrl || "/images/basic_user.jpeg"} />
                    <MainUserInfo>
                      <Username size="15px" username={user?.username} textDecoration={"true"} />
                      <Name size="14px" name={user?.name} />
                    </MainUserInfo>
                  </Link>
                </MainUser>
                {user?.isMe === false && (
                  <FollowButton isFollowing={user?.isFollowing} onClick={() => handleToggleFollow(user?.isFollowing, user?.username)} type="button">
                    {user?.isFollowing === true ? "팔로잉" : "팔로우"}
                  </FollowButton>
                )}
              </MainContent>
            ))}
          </UsersContainer>
        </Container>
      )}
    </MainLayout>
  );
};

export default SeeUsers;
