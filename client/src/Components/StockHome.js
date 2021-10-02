import React, { Component } from "react";
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import axios from "axios";
import { APIURL } from "../API/environment";

class StockHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: [],
      stockLists: [],
    };
  }
  async componentDidMount() {
    await axios.get(`${APIURL}/stock/get_all_stock`).then((response) => {
      this.setState({ stockList: response.data.Stock });
      console.log("stockList =>", this.state.stockList);
    });
  }

  pdfGenarate() {
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.text("Medicine Stock Report", 30, 10);

    // let array = [];
    // this.state.stockLists.map((item, index) => {
    //   let row = [];
    //   row.push(index + 1);
    //   row.push(item.stockCode);
    //   row.push(item.bioName);
    //   row.push(item.medicine);
    //   row.push(item.quantity);
    //   row.push(item.sellingPrice);
    //   array.push(row);
    //   return row;
    // });

    //console.log("arr", array);

    doc.save("MedicineStock.pdf");
  }

  render() {
    return (
      <div className="MainContainer">
        <div className="containerminor">
          <img src={logo} className="logo" alt="" />
          <img src={user} className="user" alt="" />
          <Sidebar />
          <img src={logout} className="logout" alt="" />
        </div>
        <div className="stockbox">
          <div className="row" style={{ marginTop: 60, marginLeft: -35 }}>
            <div className="col-6">
              <Link to="/stock">
                <div className="main_button">
                  <span className="font-link">
                    <p2>New Medicine</p2>
                  </span>
                </div>
              </Link>
            </div>
            <div className="col-6">
              <Link to="/get_stock">
                <div className="main_button" style={{ marginLeft: -5 }}>
                  <span className="font-link">
                    <p2>All Medicine</p2>
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col-6">
              <div className="main_button2">
                <Link to="/invoiceV">
                  <span className="font-link">
                    <p2 style={{ marginLeft: 120 }}>Download Report</p2>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StockHome;
