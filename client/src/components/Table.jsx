// lib
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import moment from "moment";
import NumberFormat from "react-number-format";
// local
import { readMoney } from "../actions/moneyAction";
const Table = () => {
  // state
  const [money, setMoney] = useState([]);
  // useSelector
  const { auth } = useSelector((state) => ({ ...state }));

  const getMoney = async (token) => {
    try {
      const res = await readMoney(token);
      setMoney(res.data.money);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getMoney(auth.token);
  }, [auth.token]);

  return (
    <div className="flex justify-center px-2">
      <table className="table-fixed xs:w-full sm:w-4/5  shadow-lg">
        <thead className="bg-gradient-to-r from-green-400 via-green-500 to-blue-500 text-white">
          <tr>
            <th className="py-3 w-7 border border-white">No</th>
            <th className="py-3 w-2/12 border border-white">Date</th>
            <th className="py-3 xs:w-3/12 w-4/12 border border-white">Money</th>
          </tr>
        </thead>
        <tbody>
          {money &&
            money.map((item, index) => (
              <tr
                className={`text-center ${
                  item.status === "plus" ? "bg-green-500" : "bg-red-500"
                } font-bold`}
                key={item._id}
              >
                <td className="border border-white py-2">{index + 1}.</td>
                <td className="border border-white py-2">
                  {moment(item.createdAt).format("DD-MM-YYYY HH:mm")}
                </td>
                <td className="border border-white py-2">
                  <span className="flex items-center justify-center">
                    {item.status === "plus" ? (
                      <PlusOutlined className="mr-1" />
                    ) : (
                      <MinusOutlined className="mr-1" />
                    )}
                    <NumberFormat
                      value={item.money}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
