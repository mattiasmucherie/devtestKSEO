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

  getList = status => {
    this.setState({ loading: true });
    fetch(
      `https://arcane-fjord-86837.herokuapp.com/api/search?status=${status}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56WkdOVEEyTkRVNFJqZ3pRVEl5UVVNNVFVRTBNelV3TkVORU56RTBOVGs1TlRGR056Y3dOQSJ9.eyJpc3MiOiJodHRwczovL2Rldi0zOTVnemEzaC5ldS5hdXRoMC5jb20vIiwic3ViIjoiV1gzNXlacm9vcFNNMUdpSGlCdWVLZjdRT0JnRUE4Q0VAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc2NhbmlhLWtzZW8iLCJpYXQiOjE1NzAwMjUyMTQsImV4cCI6MTU3MDExMTYxNCwiYXpwIjoiV1gzNXlacm9vcFNNMUdpSGlCdWVLZjdRT0JnRUE4Q0UiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.ohAAy92F_ZS6v0QkNLs6gUDKjJ6qmC7xRhVB3EVaeXYtXBSltfWCfwX_BtBUkCDoeYUCWoMcbAJGlsPbm4NiuK-EIpe1_E8sstAWS4vDQsfPEooOvPYliL7XdKwh_jBMZo4AYPtzMY3uHhQVo1zNXCxFC3Say1vkN5IKyeaYblQgn7FR_b03Qz3syAqw9PTWxlJ9QDOaX4re3UG5jJW3VILs41fnmrpsh2L9MzPyfHzj8gY8dRTgd7wC2dPGibmj-Ayw2yjzgP8_6hIL_5JRCv5t16NUSiYYznv-TDEadcwJuWmB5CCpm-LRdN91dpiHSpCTG3RFl-bJGiwpQuxIzQ"
        },
        credentials: "same-origin"
      }
    )
      .then(res => res.json())
      .then(list => {
        this.setState({ list, loading: false });
      });
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ status: e.target.textContent });
    this.getList(e.target.textContent);
  };

  render() {
    let vehicles = null;
    if (this.state.loading) {
      vehicles = (
        <div className="loading" style={{ height: "200px" }}>
          {" "}
        </div>
      );
    }

    if (!this.state.loading && this.state.list.length !== 0) {
      vehicles = this.state.list.map(veh => {
        return (
          <VehicleCard
            key={veh.vehicles.vin}
            vin={veh.vehicles.vin}
            reg={veh.vehicles.reg}
            status={veh.vehicles.status}
            name={veh.name}
          ></VehicleCard>
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
