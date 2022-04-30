import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Hashtag from "./pages/Hashtag";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SeeUsers from "./pages/SeeUsers";
import EditProfile from "./pages/EditProfile";
import { isLoggedInVar } from "./apollo";
import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {isLoggedIn === true && <Route path="photos/upload" element={<Home />} />}
          <Route path="photos/:id" element={<Home />} />
        </Route>
        <Route path="/users/all" element={<SeeUsers />} />
        <Route path="users/:username" element={<Profile />}>
          {isLoggedIn === true && <Route path="photos/upload" element={<Profile />} />}
          <Route path="photos/:id" element={<Profile />} />
          <Route path="followers" element={<Profile />} />
          <Route path="following" element={<Profile />} />
        </Route>
        {isLoggedIn === true && (
          <Route path="/users/:username/edit" element={<EditProfile />}>
            <Route path="photos/upload" element={<EditProfile />} />
          </Route>
        )}
        <Route path="hashtags/:name" element={<Hashtag />}>
          {isLoggedIn === true && <Route path="photos/upload" element={<Hashtag />} />}
          <Route path="photos/:id" element={<Hashtag />} />
        </Route>
        {isLoggedIn === false && <Route path="/login" element={<Login />} />}
        {isLoggedIn === false && <Route path="/signup" element={<SignUp />} />}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
