import React, { Component } from "react";
import logo from "../images/logo.png";
import user from "../images/user.png";
import Sidebar from "./Sidebar";
import logout from "../images/logout.png";
import back from "../images/arrow-92-48.png";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../API/environment";
import { Link } from "react-router-dom";


//gloabal variables
const initialState = {
  stockCode: "",
  bioName: "",
  medicine: "",
  quantity: "",
  sellingPrice: "",
};

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    let StockDetails = {
      stockCode: this.state.stockCode,
      bioName: this.state.bioName,
      medicine: this.state.medicine,
      quantity: this.state.quantity,
      sellingPrice: this.state.sellingPrice,
    };

    axios.post(`${APIURL}/stock/add-new-stock`, StockDetails).then((res) => {
    
      if (res.data.code === 200) {
        toast.success(res.data.message);
        window.setTimeout(function () {
          window.location.href = "/stock";
        }, 2000);
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
                  style={{ marginTop: 10, marginLeft: 50 }}
                />
              </Link>
            </div>
            <div className="col-8">
              <h1
                className="font-link"
                style={{
                  fontFamily: "Poppins",
                  fontSize: 55,
                  color:"#125465",
                  marginLeft: -120,
                }}
              >
                Add Medicine
              </h1>
            </div>
          </div>

          <form method="POST" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Medicine Code</label>
              <input
                type="text"
                className="form-control"
                name="stockCode"
                value={this.state.stockCode}
                onChange={this.onChange}
                placeholder="MC-000"
              />
            </div>
            <div className="form-group">
              <label>Bio Name</label>
              <input
                type="text"
                className="form-control"
                name="bioName"
                value={this.state.bioName}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Medicine</label>
              <input
                type="text"
                className="form-control"
                name="medicine"
                value={this.state.medicine}
                onChange={this.onChange}
              />
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.onChange}
                    style={{ width: 250 }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label style={{ marginLeft: -5 }}>Selling Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sellingPrice"
                    value={this.state.sellingPrice}
                    onChange={this.onChange}
                    style={{ width: 250, marginLeft: -5 }}
                  />
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn submit mb-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Stock;
