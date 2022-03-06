import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { handleLogout, isLoggedInVar } from "../apollo";
import { useSeeMeQuery } from "../generated/graphql";

const useLoggedInUser = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const { data } = useSeeMeQuery({ skip: isLoggedIn === false });

  useEffect(() => {
    if (data?.seeMe.user === null) {
      console.log("유효하지 않은 토큰입니다. 로그아웃 처리되었습니다.");
      handleLogout();
    }
  }, [data]);

  return data?.seeMe.user;
};

export default useLoggedInUser;
