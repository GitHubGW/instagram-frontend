import { useEffect } from "react";
import { useSeeMeQuery } from "../generated/graphql";
import { isLoggedInVar } from "../apollo";
import { ApolloClient, useApolloClient, useReactiveVar } from "@apollo/client";

const useLoggedInUser = () => {
  const client: ApolloClient<object> = useApolloClient();
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const { data: seeMeData } = useSeeMeQuery({ skip: isLoggedIn === false });

  useEffect(() => {
    if (seeMeData?.seeMe.user === null) {
      isLoggedInVar(false);
    }
  }, [seeMeData, client]);

  return seeMeData?.seeMe.user;
};

export default useLoggedInUser;
