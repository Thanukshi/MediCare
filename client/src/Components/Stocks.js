import React, { Component } from "react";
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import homeVector from "../images/man.png";
import shadow from "../images/shadow.png";
import axios from "axios";
import { APIURL } from "../API/environment";

import Calendar from "react-calendar";

class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      reqCount: 1,
      invoiceList: [],
    };
  }

  async componentDidMount() {
    let CountReleased;
    await axios.get(`${APIURL}/invoice/get_all_invoice`).then((response) => {
      this.setState({ invoiceList: response.data.Invoice });
      console.log("CountRresponse.data.Invoiceeleased", response.data.Invoice);
      console.log("this.state.invoiceList.isProceed", response.data);

      this.state.invoiceList.map((item, index) => {
        if (item.isProceed === 1) {
          CountReleased = this.state.count++;
        }
      });

      this.setState({ count: CountReleased });

      console.log("CountReleased", CountReleased);
    });

    let ReqCount;
    await axios.get(`${APIURL}/stock/get_all_stock`).then((response) => {
      this.setState({ stockList: response.data.Stock });

      this.state.stockList.map((item, index) => {
        if (item.quantity <= 100) {
          ReqCount = this.state.reqCount++;
        }
      });

      this.setState({ reqCount: ReqCount });

      console.log("ReqCount", ReqCount);
    });
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

        <div className="welcomebox">
          <img src={homeVector} className="homeVector" alt="" />
          <img src={shadow} className="shadow" alt="" />
          <span className="font-link">
            <h2 className="welcm-name"> Hello Sachini!</h2>
            <p className="welcm-line">
              {" "}
              May every step you make be <br /> filled with happiness
            </p>
          </span>
        </div>
        <div className="calendarbox">
          <Calendar />
        </div>
        <div className="releasebox">
          <span className="font-link">
            <p2>Release Orders</p2>
          </span>
          <p5>{this.state.count}</p5>
        </div>

        <div className="requestbox">
          <span className="font-link">
            <p3>Request Orders</p3>
          </span>
          <p4>{this.state.reqCount}</p4>
        </div>
      </div>
    );
  }
}

export default Stocks;
