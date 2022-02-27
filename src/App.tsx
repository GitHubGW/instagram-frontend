import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn === true ? <Home /> : <Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
