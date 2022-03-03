import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import client, { isDarkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, lightTheme } from "./styles/themes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import GlobalStyle from "./styles/GlobalStyle";
import { HelmetProvider } from "react-helmet-async";
import routes from "./routes";

const App = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);

  console.log("isLoggedIn", isLoggedIn);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode === true ? darkTheme : lightTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route path={routes.home} element={<Home />} />
              {isLoggedIn === false && <Route path={routes.login} element={<Login />} />}
              {isLoggedIn === false && <Route path={routes.signup} element={<SignUp />} />}
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
