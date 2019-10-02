import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Status from "./pages/Status";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <c-main-content>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/customers">
            <Customers></Customers>
          </Route>
          <Route exact path="/status">
            <Status></Status>
          </Route>
        </Switch>
      </c-main-content>
    </BrowserRouter>
  );
}

export default App;
