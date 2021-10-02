import React, { Component } from "react";
import back from "../images/arrow-92-48.png";
import axios from "axios";
import { APIURL } from "../API/environment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class InvoiceView extends Component {
  constructor(props) {
    super(props);
    this.state = {invoiceList: [] };
  }

  async componentDidMount() {
    await axios
      .get(`${APIURL}/invoice/get_invoice/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ invoiceList: response.data.Invoice[0] });
        console.log("object", response.data.Invoice[0]);

        if (response.data.code === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      });
  }
  render() {
    return (
      <div className="MainContainer">
        <div className="col-4">
          <Link to="/invoice">
            <img src={back} alt="" style={{ marginTop: 30, marginLeft: 50 }} />
          </Link>
        </div>
        <div className="col-8">
          <h1
            className="font-link"
            style={{
              fontFamily: "Poppins",
              fontSize: 55,
              color: "#125465",
              marginLeft: 475,
              marginTop: -70,
            }}
          >
            Invoice
          </h1>
        </div>

        <div className="row" style={{ marginTop: -50, marginLeft: 0 }}>
          <div className="col-6">
            <div className="detailbox">
              <span className="font-link">
                <p2>Order ID</p2>
                <p1 style={{ marginLeft: 30 }}>{this.state.invoiceList.order_id}</p1>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="detailbox" style={{ marginLeft: -5 }}>
              <span className="font-link">
                <p2>Invoice ID</p2>
                <p1 style={{ marginLeft: 30 }}>{this.state.invoiceList.order_id}</p1>
              </span>
            </div>
          </div>
        </div>

        <br />
        <div className="row" style={{ marginTop: 55, marginLeft: 0 }}>
          <div className="col-6">
            <div className="detailbox">
              <span className="font-link">
                <p2>Date</p2>
                <p1 style={{ marginLeft: 30 }}>{this.state.invoiceList.date}</p1>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="detailbox" style={{ marginLeft: -5 }}>
              <span className="font-link">
                <p2>Amount</p2>
                <p1 style={{ marginLeft: 30 }}>{this.state.invoiceList.amount}</p1>
              </span>
            </div>
          </div>
        </div>

        <div className="invoicebox">
          <div className="tablecontainernew">
            <table style={{ width: 850 }}>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Panadol</td>
                  <td>10</td>
                  <td>200</td>
                </tr>
              </tbody>
            </table>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceView;
