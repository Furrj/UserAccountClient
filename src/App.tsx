import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//VIEWS
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import HomePage from "./views/HomePage";
import ProfilePage from "./views/ProfilePage";

//LAYOUTS
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Wrapper from "./layouts/Wrapper";

//STATE
export type IUser = {
  username: string;
  id: string;
  valid: boolean;
};

const initState = {
  username: "",
  id: "",
  valid: false,
};

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser>(initState);

  const logout = (): void => {
    setLoggedIn(false);
    setUserInfo(initState);
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar
          loggedIn={loggedIn}
          username={userInfo.username}
          logout={logout}
        />
        <Wrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setLoggedIn={setLoggedIn}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              }
            />
            <Route
              path="/register"
              element={
                <RegisterPage
                  setLoggedIn={setLoggedIn}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage userInfo={userInfo} loggedIn={loggedIn} />}
            />
          </Routes>
        </Wrapper>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
