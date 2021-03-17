// lib
import React from "react";
import { useDispatch } from "react-redux";
// local
import { LOGOUT } from "../../reducers/auth/authType";

const Home = ({ history }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <div className="flex justify-between">
      <h1>Home</h1>
      <h1>Save Money</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
