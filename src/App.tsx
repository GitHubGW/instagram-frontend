import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import client, { isDarkModeVar } from "./apollo";
import { darkTheme, lightTheme } from "./styles/themes";
import GlobalStyle from "./styles/GlobalStyle";
import { HelmetProvider } from "react-helmet-async";
import Router from "./Router";

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
