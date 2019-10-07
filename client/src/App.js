import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Status from "./pages/Status";
import Header from "./components/header";

// Displays Home page for all urls exept "/customers" and "/status" whre the appropriate page is displayed.

function App() {
  return (
    <BrowserRouter>
      <Header />
      <c-main-content>
        <Switch>
          <Route exact path="/customers">
            <Customers />
          </Route>
          <Route exact path="/status">
            <Status />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </c-main-content>
    </BrowserRouter>
  );
}

export default App;
