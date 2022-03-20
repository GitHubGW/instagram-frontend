import { ApolloClient, ApolloLink, createHttpLink, GraphQLRequest, InMemoryCache, makeVar, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN: string = "TOKEN";
const DARK_MODE: string = "DARK_MODE";

export const isLoggedInVar = makeVar<boolean>(Boolean(localStorage.getItem(TOKEN)));
export const isDarkModeVar = makeVar<boolean>(Boolean(localStorage.getItem(DARK_MODE) === "true"));

export const handleLogin = (token: string): void => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const handleLogout = (client: ApolloClient<object>): void => {
  client.clearStore();
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

const httpLink: ApolloLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink: ApolloLink = setContext((operation: GraphQLRequest, prevContext: any) => {
  const token: string | null = localStorage.getItem(TOKEN);
  return { headers: { ...prevContext.headers, token } };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
