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
      console.log("로그인되어 있지 않습니다.", seeMeData);
      // handleLogout(client);
    }
  }, [seeMeData, client]);

  return seeMeData?.seeMe.user;
};

export default useLoggedInUser;
