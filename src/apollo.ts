import { ApolloClient, InMemoryCache, makeVar, NormalizedCacheObject } from "@apollo/client";

const TOKEN: string = "TOKEN";
const DARK_MODE: string = "DARK_MODE";

export const isLoggedInVar = makeVar<boolean>(Boolean(localStorage.getItem(TOKEN)));
export const isDarkModeVar = makeVar<boolean>(Boolean(localStorage.getItem(DARK_MODE) === "true"));

export const handleLogin = (token: string): void => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const handleLogout = (): void => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const handleEnableDarkMode = (): void => {
  localStorage.setItem(DARK_MODE, "true");
  isDarkModeVar(true);
};

export const handleDisableDarkMode = (): void => {
  localStorage.setItem(DARK_MODE, "false");
  isDarkModeVar(false);
};

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
