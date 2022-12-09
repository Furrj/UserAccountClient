import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

//TYPES
import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  loggedIn: boolean;
}

const ProfilePage: React.FC<IProps> = ({ userInfo, loggedIn }) => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!loggedIn) return navigate("/login");
  }, []);

  return <div>{loggedIn && <h1>{userInfo.username}'s Profile</h1>}</div>;
};

export default ProfilePage;
