import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import UsernameTaken from "../layouts/UsernameTaken";

import { IUser } from "../App";

//STATE
interface IState {
  username: string;
  password: string;
}

const initState: IState = {
  username: "",
  password: "",
};

//PROPS
interface IProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

const RegisterPage: React.FC<IProps> = ({
  setLoggedIn,
  userInfo,
  setUserInfo,
}) => {
  const [userInput, setUserInput] = useState<IState>(initState);
  const [taken, setTaken] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const register = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data: IUser = await res.json();
    if (!data.valid) {
      setTaken(true);
    } else {
      setTaken(false);
      setLoggedIn(true);
      setUserInfo(data);
      return navigate("/profile");
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
      {taken && (
        <div>
          <UsernameTaken />
          <br />
        </div>
      )}
      <button className="mt-3 btn btn-primary" onClick={register}>
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
