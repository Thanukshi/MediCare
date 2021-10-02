import React, { Component } from "react";
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import back from "../images/arrow-92-48.png";
import axios from "axios";
import { APIURL } from "../API/environment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceList: [],
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e, id) {
    axios.delete(`${APIURL}/stock/delete_stock/${id}`).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    });
  }

  async componentDidMount() {
    await axios.get(`${APIURL}/invoice/get_all_invoice`).then((response) => {
      this.setState({ invoiceList: response.data.Invoice });

      if (response.data.code === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    });
  }

  onProceed(e, id) {
    let updateDetailsStatus = {
      isProceed: 1,
    };

    console.log(id);
    axios
      .put(`${APIURL}/invoice/proceed_invoice/${id}`, updateDetailsStatus)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
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

          <div className="tablecontainer">
            <table>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Order ID</th>
                  <th>NIC</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.invoiceList.length > 0 && //read array
                  this.state.invoiceList.map((item, index) => (
                    <tr>
                      {item.isProceed === 1 && (
                        <>
                          <td>{item.invoice_id}</td>
                          <td>{item.order_id}</td>
                          <td>{item.NIC}</td>
                          <td style={{ textAlign: "center" }}> {item.amount}</td>
                          <td>{item.date}</td>
                          <td style={{ fontSize: 18 }}>
                            <span
                              className="text-success"
                              style={{ marginLeft: 30, width: 65 }}
                            >
                              Proceed
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
