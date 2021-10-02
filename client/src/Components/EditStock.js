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

const initialState = {
  stockCode: "",
  bioName: "",
  medicine: "",
  quantity: "",
  sellingPrice: "",
};

class EditStock extends Component {
  constructor(props) {
    super(props);
    this.state = { initialState, stockList: [] };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    await axios
      .get(`${APIURL}/stock/get_stock/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ stockList: response.data.Stock[0] });

        if (response.data.code === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }

        //assign data to global variable comming from array
        this.setState({ stockCode: this.state.stockList.stockCode });
        this.setState({ bioName: this.state.stockList.bioName });
        this.setState({ medicine: this.state.stockList.medicine });
        this.setState({ quantity: this.state.stockList.quantity });
        this.setState({ sellingPrice: this.state.stockList.sellingPrice });
      });
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

    axios
      .put(
        `${APIURL}/stock/update_stock/${this.props.match.params.id}`,
        StockDetails
      )
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          window.setTimeout(function () {
            window.location.href = "/get_stock";
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
              <Link to="/get_stock">
                <img
                  src={back}
                  alt=""
                  style={{ marginTop: 30, marginLeft: 50 }}
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
                  marginTop: 10,
                  marginLeft: -150,
                }}
              >
                Edit Medicine
              </h1>
            </div>
          </div>

          <form method="POST" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Medicine Code </label>
              <input
                type="text"
                className="form-control"
                name="stockCode"
                value={this.state.stockCode}
                onChange={this.onChange}
                style={{ color: "black" }}
                readOnly
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
              <button type="submit" className="btn submit mb-4" style={{  marginTop: 10 }}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditStock;
