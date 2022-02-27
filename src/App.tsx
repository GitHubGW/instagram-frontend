import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { isDarkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, lightTheme } from "./styles/themes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  const isDarkMode: boolean = useReactiveVar(isDarkModeVar);

  return (
    <ThemeProvider theme={isDarkMode === true ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn === true ? <Home /> : <Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
