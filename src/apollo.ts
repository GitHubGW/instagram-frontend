import { ApolloClient, InMemoryCache, makeVar, NormalizedCacheObject } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(false);

export const isDarkModeVar = makeVar<boolean>(false);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
