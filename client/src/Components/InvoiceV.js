import axios from "axios";
import React, { useEffect, useState } from "react";
import GetAllStock from "./GetAllStock";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { APIURL } from "../API/environment";
import Sidebar from "./Sidebar";
import logo from "../images/logo.png";
import user from "../images/user.png";
import logout from "../images/logout.png";
import back from "../images/arrow-92-48.png";

const InvoiceV = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [deleted, setDeleted] = useState(0);

  useEffect(() => {
    async function gedData() {
      try {
        const response = await axios.get(`${APIURL}/stock/get_all_stock`);
        if (response.status === 200) {
          setStock(response.data.Stock);
          setBaseData(response.data.Stock);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  const downloadReport = () => {
    doc.text("Stock report", 30, 10);

    let array = [];
    stock.map((stocks, index) => {
      let row = [];
      row.push(index + 1);
      row.push(stocks.stockCode);
      row.push(stocks.bioName);
      row.push(stocks.medicine);
      row.push(stocks.quantity);
      row.push(stocks.sellingPrice);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [["#", "Stock Code", "Bio Name", "Medicine", "Quantity", "Price"]],

      body: array,
    });

    doc.save("stock.pdf");
    window.location.reload();
  };

  const doc = new jsPDF("landscape");
  return (
    <div className="MainContainer">
      <div className="containerminor">
        <img src={logo} className="logo" alt="" />
        <img src={user} className="user" alt="" />
        <Sidebar />
        <img src={logout} className="logout" alt="" />
      </div>

      <div className="stockbox">
        <div className="row">
          <div className="col-4">
            <Link to="/stock_home">
              <img
                src={back}
                alt=""
                style={{ marginTop: 25, marginLeft: 50 }}
              />
            </Link>
          </div>
          <div className="col-8">
            <h1
              className="font-link"
              style={{
                fontFamily: "Poppins",
                fontSize: 55,
                color: "#125465",
                marginTop: 25,
                marginLeft: -120,
              }}
            >
              All Medicine
            </h1>

            <div className="topnav">
              <input type="text" placeholder="Search.." />
            </div>
          </div>
        </div>

        <div
          className="col-3 buttons2"
          style={{ marginLeft: 20, marginTop: -20, fontSize: 20 }}
        >
          <Link onClick={downloadReport}>Download Report</Link>
          <br />
          <br />
        </div>

        <div className="tablecontainer">
          <table>
            <thead>
              <tr>
                <th>Stock Code</th>
                <th>Bio Name</th>
                <th>Medicine</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stock.length > 0 && //read array
                stock.map((item, index) => (
                  <tr>
                    <td>{item.stockCode}</td>
                    <td>{item.bioName}</td>
                    <td>{item.medicine}</td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ textAlign: "center" }}>{item.sellingPrice}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isLoading ? (
          <div className="container text-center py-5">
            <Loader type="Oval" color="#0d6efd" height={30} width={30} />
          </div>
        ) : stock.length > 0 ? (
          <></>
        ) : (
          <div className="container text-center py-5">
            <h3>No stock found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceV;
