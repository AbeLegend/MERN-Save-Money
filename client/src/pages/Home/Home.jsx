// lib
import React, { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
// local
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import Table from "../../components/Table";
import Modal from "../../components/Modal.jsx";
import { myMoney } from "../../actions/moneyAction";

const Home = () => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [money, setMoney] = useState(0);

  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));

  const isShowModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  useEffect(() => {
    loadMoney();
  }, []);

  const loadMoney = async () => {
    try {
      const { data } = await myMoney(token);
      setMoney(data);
    } catch (err) {
      toast.error("Can not get data, Please reload page");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <main className="mb-auto">
        <div className="flex justify-center my-5 items-center">
          <h1 className="text-2xl font-bold bg-blue-500 p-2 rounded-md shadow-lg text-white">
            <NumberFormat
              value={money}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp. "}
              suffix={",-"}
            />
          </h1>
          <button
            className="flex items-center text-4xl ml-5 p-1 rounded-md hover:bg-green-500 hover:text-white"
            onClick={isShowModal}
          >
            <PlusCircleOutlined />
          </button>
        </div>
        <Table />
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
