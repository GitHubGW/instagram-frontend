import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import EditProfile from "./pages/EditProfile";
import Hashtag from "./pages/Hashtag";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import routes from "./routes";

const Router = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        {isLoggedIn === false && <Route path={routes.login} element={<Login />} />}
        {isLoggedIn === false && <Route path={routes.signup} element={<SignUp />} />}
        <Route path={`/users/:username`} element={<Profile />} />
        {isLoggedIn === true && <Route path={`/users/:username/edit`} element={<EditProfile />} />}
        <Route path={`/hashtags/:name`} element={<Hashtag />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
