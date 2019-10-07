import React, { Component } from "react";
import CustomersVeh from "../components/customersVeh";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      focusCustomer: ""
    };
  }

  componentDidMount() {
    this.getList();
  }
  getList = () => {
    fetch("https://arcane-fjord-86837.herokuapp.com/api/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56WkdOVEEyTkRVNFJqZ3pRVEl5UVVNNVFVRTBNelV3TkVORU56RTBOVGs1TlRGR056Y3dOQSJ9.eyJpc3MiOiJodHRwczovL2Rldi0zOTVnemEzaC5ldS5hdXRoMC5jb20vIiwic3ViIjoiV1gzNXlacm9vcFNNMUdpSGlCdWVLZjdRT0JnRUE4Q0VAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc2NhbmlhLWtzZW8iLCJpYXQiOjE1NzAwMjUyMTQsImV4cCI6MTU3MDExMTYxNCwiYXpwIjoiV1gzNXlacm9vcFNNMUdpSGlCdWVLZjdRT0JnRUE4Q0UiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.ohAAy92F_ZS6v0QkNLs6gUDKjJ6qmC7xRhVB3EVaeXYtXBSltfWCfwX_BtBUkCDoeYUCWoMcbAJGlsPbm4NiuK-EIpe1_E8sstAWS4vDQsfPEooOvPYliL7XdKwh_jBMZo4AYPtzMY3uHhQVo1zNXCxFC3Say1vkN5IKyeaYblQgn7FR_b03Qz3syAqw9PTWxlJ9QDOaX4re3UG5jJW3VILs41fnmrpsh2L9MzPyfHzj8gY8dRTgd7wC2dPGibmj-Ayw2yjzgP8_6hIL_5JRCv5t16NUSiYYznv-TDEadcwJuWmB5CCpm-LRdN91dpiHSpCTG3RFl-bJGiwpQuxIzQ"
      },
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(list => {
        this.setState({ list });
      });
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ focusCustomer: e.target.title });
  };

  render() {
    // "customers" represent the available customers while "customer" is the table of a clicked customer.

    const { list } = this.state;
    let customers = (
      <div className="loading" style={{ height: "200px" }}>
        {" "}
      </div>
    );
    if (list.length !== 0) {
      customers = list.map(cust => {
        return (
          <li
            key={cust._id}
            className={
              this.state.focusCustomer === cust.nickName ? "active" : null
            }
          >
            <a title={cust.nickName} href="/" onClick={this.handleClick}>
              {cust.name}
            </a>
          </li>
        );
      });
    }
    let customer;
    if (this.state.focusCustomer !== "") {
      customer = (
        <CustomersVeh nickname={this.state.focusCustomer}></CustomersVeh>
      );
    }
    return (
      <section>
        <div className="container">
          <div className="row">
            <ul className="nav nav-tabs  nav-tabs-light">{customers}</ul>
            {customer}
          </div>
        </div>
      </section>
    );
  }
}
export default Customers;
