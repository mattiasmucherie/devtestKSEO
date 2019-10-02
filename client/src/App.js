import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Header from "./components/header";
import Footer from "./components/footer";
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
            {/* Incoming page */}
          </Route>
        </Switch>
      </c-main-content>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
