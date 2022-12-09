import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import InvalidInfo from "../layouts/InvalidInfo";

import { IUser } from "../App";

//STATE
interface IState {
  username: string;
  password: string;
}

const initState = {
  username: "",
  password: "",
};

//PROPS
interface IProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

const LoginPage: React.FC<IProps> = ({
  setLoggedIn,
  userInfo,
  setUserInfo,
}) => {
  const [userInput, setUserInput] = useState<IState>(initState);
  const [invalidInfo, setInvalidInfo] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const login = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data: IUser = await res.json();
    if (data.valid) {
      setLoggedIn(true);
      setUserInfo(data);
      setInvalidInfo(false);
      return navigate("/");
    } else {
      setInvalidInfo(true);
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card">
      <div>Username: </div>
      <input
        type="text"
        name="username"
        value={userInput.username}
        onChange={inputHandler}
        className="form-control"
      />
      <br />
      <div>Password:</div>
      <input
        type="text"
        name="password"
        value={userInput.password}
        onChange={inputHandler}
        className="form-control"
      />
      <br />
      {invalidInfo && (
        <div>
          <InvalidInfo />
          <br />
        </div>
      )}
      <button className="mt-3 btn btn-primary" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
