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
    if (this.props.token) {
      this.getList(this.props.token);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.getList(this.props.token);
    }
  }

  getList = token => {
    fetch("https://arcane-fjord-86837.herokuapp.com/api/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(list => {
        this.setState({ list });
      })
      .catch(err => console.log(err))
      .catch(err => console.log(err));
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
        <CustomersVeh
          nickname={this.state.focusCustomer}
          token={this.props.token}
        />
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
