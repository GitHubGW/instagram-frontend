import { useEffect } from "react";
import { useSeeMeQuery } from "../generated/graphql";
import { handleLogout, isLoggedInVar } from "../apollo";
import { ApolloClient, useApolloClient, useReactiveVar } from "@apollo/client";

const useLoggedInUser = () => {
  const client: ApolloClient<object> = useApolloClient();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const { data: seeMeData } = useSeeMeQuery({ skip: isLoggedIn === false });

  useEffect(() => {
    if (seeMeData?.seeMe.user === null) {
      console.log("유효하지 않은 토큰입니다. 로그아웃 처리되었습니다.");
      handleLogout(client);
    }
  }, [seeMeData, client]);

  return seeMeData?.seeMe.user;
};

export default useLoggedInUser;
