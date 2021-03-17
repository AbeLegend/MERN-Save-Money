import React from "react";

const index = ({ history }) => {
  return (
    <>
      <h1 className="text-center mt-10 text-2xl">
        Welcome to save money website
      </h1>
      <div className="text-center flex justify-around">
        <button onClick={() => history.push("/login")}>Login</button>
        <button onClick={() => history.push("/register")}>Register</button>
      </div>
    </>
  );
};

export default index;
