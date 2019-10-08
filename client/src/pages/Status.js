import React, { Component } from "react";
import VehicleCard from "../components/vehicleCard";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      status: "",
      loading: false
    };
  }

  getList = (token, status) => {
    this.setState({ loading: true });
    fetch(
      `https://arcane-fjord-86837.herokuapp.com/api/search?status=${status}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: "same-origin"
      }
    )
      .then(res => res.json())
      .then(list => {
        this.setState({ list, loading: false });
      })
      .catch(err => console.log(err))
      .catch(err => console.log(err));
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ status: e.target.textContent });
    this.getList(this.props.token, e.target.textContent);
  };

  render() {
    let vehicles = null;

    // Show loading status while loading the list
    if (this.state.loading) {
      vehicles = (
        <div className="loading" style={{ height: "200px" }}>
          {" "}
        </div>
      );
    }

    // When loading is done, insert VehicleCards
    if (!this.state.loading && this.state.list.length !== 0) {
      vehicles = this.state.list.map(veh => {
        return (
          <VehicleCard
            key={veh.vehicles.vin}
            vin={veh.vehicles.vin}
            reg={veh.vehicles.reg}
            status={veh.vehicles.status}
            name={veh.name}
          />
        );
      });
    }
    return (
      <section>
        <div className="container">
          <div
            className="btn-group btn-group-sm"
            style={{ paddingBottom: "1.5rem" }}
          >
            <a
              href="/"
              className={`btn btn-success ${
                this.state.status === "online" ? "disabled" : null
              }`}
              onClick={this.handleClick}
            >
              online
            </a>
            <a
              href="/"
              className={`btn btn-danger ${
                this.state.status === "offline" ? "disabled" : null
              }`}
              onClick={this.handleClick}
            >
              offline
            </a>
          </div>
          <div className="row">{vehicles}</div>
        </div>
      </section>
    );
  }
}
export default Status;
