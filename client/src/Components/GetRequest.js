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

class GetRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: [],
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
    await axios.get(`${APIURL}/stock/get_all_stock`).then((response) => {
      this.setState({ stockList: response.data.Stock });

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
                  <th>Stock Code</th>
                  <th>Bio Name</th>
                  <th>Medicine</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.stockList.length > 0 && //read array
                  this.state.stockList.map((item, index) => (
                    <tr>
                      {item.quantity <= 100 && (
                        <>
                          <td>{item.stockCode}</td>
                          <td>{item.bioName}</td>
                          <td>{item.medicine}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.quantity}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.sellingPrice}
                          </td>{" "}
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

export default GetRequest;
