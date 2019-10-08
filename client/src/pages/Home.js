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

  render() {
    const { list } = this.state;

    // Show loading status while loading the list
    let vehicles = (
      <div className="loading" style={{ height: "200px" }}>
        {" "}
      </div>
    );

    // When loading is done, insert VehicleCards
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
          />
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
