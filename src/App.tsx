import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { isDarkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, lightTheme } from "./styles/themes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import GlobalStyle from "./styles/GlobalStyle";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);

  console.log("isLoggedIn", isLoggedIn);

  return (
    <HelmetProvider>
      <ThemeProvider theme={isDarkMode === true ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isLoggedIn === true ? <Home /> : <Login />} />
            {isLoggedIn === false && <Route path="/login" element={<Login />} />}
            {isLoggedIn === false && <Route path="/signup" element={<SignUp />} />}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
