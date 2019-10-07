import React, { Component } from "react";

class CustomersVeh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getList(this.props.token);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.nickname !== this.props.nickname) {
      this.getList(this.props.token);
    }
  }

  getList = token => {
    this.setState({ loading: true });
    // Use the nickname to get customer data
    fetch(
      `https://arcane-fjord-86837.herokuapp.com/api/search?customer=${this.props.nickname}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: "same-origin"
      }
    )
      .then(res => res.json())
      .then(customer => {
        this.setState({ customer });
        this.setState({ loading: false });
      });
  };

  render() {
    let customer = (
      <tr>
        <td>
          <div className="loading" style={{ height: "100px" }}>
            {" "}
          </div>
        </td>
        <td />
        <td />
      </tr>
    );
    if (this.state.customer.length !== 0 && !this.state.loading) {
      customer = this.state.customer[0].vehicles.map(veh => {
        return (
          <tr
            key={veh.vin}
            className={veh.status === "online" ? "success" : "danger"}
          >
            <td>{veh.vin}</td>
            <td>{veh.reg}</td>
            <td>{veh.status}</td>
          </tr>
        );
      });
    }
    return (
      <div className="container table-responsive">
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>Vin</th>
              <th>Reg</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{customer}</tbody>
        </table>
      </div>
    );
  }
}
export default CustomersVeh;
