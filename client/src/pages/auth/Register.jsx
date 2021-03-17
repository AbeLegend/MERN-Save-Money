// lib
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DollarCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
// local
import { register } from "../../actions/authAction";

const Register = ({ history }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Register success. Please Login");
      history.push("/login");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-green-500 to-blue-500 h-screen flex justify-center">
      <div className="bg-white rounded-lg m-auto p-10">
        <h1 className="text-3xl font-bold text-center mb-3">Register</h1>
        <p className="text-center text-gray-500 mb-10">
          Please register to save your money{" "}
          <DollarCircleOutlined className="text-3xl text-yellow-500" />
        </p>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <label className="font-medium">Username</label>
          <input
            type="text"
            placeholder="Username..."
            className="bg-gray-100 rounded-md px-3 py-2 mb-2"
            name="username"
          />
          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="Email..."
            className="bg-gray-100 rounded-md px-3 py-2 mb-2"
            name="email"
          />
          <label className="font-medium">Password</label>
          <input
            type="password"
            placeholder="Password..."
            className="bg-gray-100 rounded-md px-3 py-2 mb-2"
            name="password"
          />
          <label className="font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password..."
            className="bg-gray-100 rounded-md px-3 py-2 mb-2"
            name="confirmPassword"
          />
          <button
            className="p-3 bg-green-400 rounded-lg my-10 hover:bg-green-300"
            type="submit"
          >
            Register
          </button>
          <small>
            Have an account ?{" "}
            <Link to="/login" className="hover:underline hover:text-blue-500">
              Login
            </Link>
          </small>
        </form>
        <br />
        <button
          className="bg-blue-400 flex p-2 rounded-md hover:bg-blue-300"
          onClick={() => history.push("/")}
        >
          <ArrowLeftOutlined />
        </button>
      </div>
    </div>
  );
};

export default Register;
