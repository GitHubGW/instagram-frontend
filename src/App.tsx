import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import client, { isDarkModeVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import { darkTheme, lightTheme } from "./styles/themes";
import { ApolloProvider, useReactiveVar } from "@apollo/client";

const App = () => {
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode === true ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
