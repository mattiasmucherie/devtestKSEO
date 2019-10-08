import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Status from "./pages/Status";
import Header from "./components/header";

// Displays Home page for all urls exept "/customers" and "/status" where the appropriate page is displayed.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }
  componentDidMount() {
    this.getToken();
  }

  getToken() {
    // This token should of course be hidden but for demo purposes and transparity I left it here.
    var options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body:
        '{"client_id":"WX35yZroopSM1GiHiBueKf7QOBgEA8CE","client_secret":"0UrVgAYzFk8Jg6yavPpOk0ZG3n_CSohAP8AIfA5dZDyJ2i48fy49BVaTkSC9wPF8","audience":"https://scania-kseo","grant_type":"client_credentials"}'
    };

    fetch("https://dev-395gza3h.eu.auth0.com/oauth/token", options)
      .then(res => res.json())
      .then(token => {
        this.setState({ token: token.access_token });
      })
      .catch(err => console.log(err))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <c-main-content>
          <Switch>
            <Route exact path="/customers">
              <Customers token={this.state.token} />
            </Route>
            <Route exact path="/status">
              <Status token={this.state.token} />
            </Route>
            <Route exact path="/">
              <Home token={this.state.token} />
            </Route>
          </Switch>
        </c-main-content>
      </BrowserRouter>
    );
  }
}

export default App;
