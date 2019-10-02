import React, { Component } from "react";
import VehicleCard from "../components/vehicleCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
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

  render() {
    const { list } = this.state;
    let vehicles = (
      <div className="loading" style={{ height: "200px" }}>
        {" "}
      </div>
    );
    if (list.length !== 0) {
      let listOfVehicles = [];
      list.map(cust => {
        listOfVehicles = [...listOfVehicles, ...cust.vehicles];
      });
      vehicles = listOfVehicles.map(veh => {
        return (
          <VehicleCard
            key={veh.vin}
            vin={veh.vin}
            reg={veh.reg}
            status={veh.status}
          ></VehicleCard>
        );
      });
    }
    return (
      <section>
        <div className="container">
          <div className="row">{vehicles}</div>
        </div>
      </section>
    );
  }
}
export default Home;
