// lib
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// local
import { createMoney } from "../actions/moneyAction";

const Modal = ({ showModal, setShowModal }) => {
  // state
  const [form, setForm] = useState({ money: 0, status: "plus" });

  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  const isShowModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createMoney(form, token);
      toast.success(
        `Success ${data.status === "plus" ? "save" : "take"} money.`
      );
    } catch (err) {
      toast.error(err.response.data);
    }
    setShowModal(!showModal);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div
      className={`${
        showModal ? "fixed z-10 inset-0 overflow-y-auto" : "hidden"
      }`}
    >
      <div className="flex justify-center min-h-screen text-center">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-white rounded-lg  overflow-hidden shadow-xl transform transition-all my-auto max-w-lg w-full ">
          <div className="p-3">
            <h1 className="font-bold text-2xl mb-10">Add Money</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <label className="font-medium mr-5">Money</label>
              <input
                type="number"
                placeholder="10000"
                className="bg-gray-100 rounded-md px-3 py-2 mb-5"
                name="money"
              />

              <br />
              <select
                className="border border-gray-400 rounded-xl text-gray-600 h-10 px-5 bg-white hover:border-gray-700 focus:outline-none appearance-none"
                name="status"
              >
                <option value="plus">Save Money</option>
                <option value="minus">Take Money</option>
              </select>
              <br />

              <div className="flex justify-end mt-5">
                <button
                  className="p-3 bg-red-400 rounded-lg hover:bg-red-300 mx-2 font-bold"
                  onClick={isShowModal}
                >
                  Cancel
                </button>
                <button
                  className="p-3 bg-green-400 rounded-lg hover:bg-green-300 mx-2 font-bold"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
