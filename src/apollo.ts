import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { FragmentDefinitionNode, OperationDefinitionNode } from "graphql";
import { ApolloClient, ApolloLink, createHttpLink, GraphQLRequest, InMemoryCache, makeVar, NormalizedCacheObject, split } from "@apollo/client";

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

const authLink: ApolloLink = setContext((operation: GraphQLRequest, prevContext) => {
  const token: string | null = localStorage.getItem(TOKEN);
  return { headers: { ...prevContext.headers, token } };
});

const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log(`Network Error`, networkError);
  }
});

const uploadHttpLink: ApolloLink = createUploadLink({
  uri: process.env.NODE_ENV === "production" ? "https://instagram-gw.herokuapp.com/graphql" : "http://localhost:4000/graphql",
});

const uploadHttpLinks: ApolloLink = authLink.concat(errorLink).concat(uploadHttpLink);

const wsLink: WebSocketLink = new WebSocketLink({
  uri: process.env.NODE_ENV === "production" ? "wss://instagram-gw.herokuapp.com/graphql" : "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: localStorage.getItem(TOKEN),
    }),
  },
});

const splitLink: ApolloLink = split(
  ({ query }) => {
    const definition: OperationDefinitionNode | FragmentDefinitionNode = getMainDefinition(query);
    const isSubscription: boolean = definition.kind === "OperationDefinition" && definition.operation === "subscription";
    return isSubscription;
  },
  wsLink,
  uploadHttpLinks
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: {
            keyArgs: false,
            merge(existing, incoming) {
              if (existing) {
                const result = { ...existing, ...incoming, photos: [...existing.photos, ...incoming.photos] };
                return result;
              }
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
