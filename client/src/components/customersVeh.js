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
    this.getList();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.nickname !== this.props.nickname) {
      this.getList();
    }
  }

  getList = () => {
    this.setState({ loading: true });
    fetch(
      `https://arcane-fjord-86837.herokuapp.com/api/search?customer=${this.props.nickname}`,
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
        <td></td>
        <td></td>
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
