import { makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(false);
