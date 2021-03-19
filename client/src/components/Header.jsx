// lib
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// local
import { LOGOUT } from "../reducers/auth/authType";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    auth: { user },
  } = useSelector((state) => ({ ...state }));

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <div className="h-14 py-3 bg-gradient-to-r from-green-400 via-green-500 to-blue-500 flex items-center px-5 justify-between">
      <h1 className="font-bold text-xl">{user.username}</h1>
      <button
        className="font-bold text-xl hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
