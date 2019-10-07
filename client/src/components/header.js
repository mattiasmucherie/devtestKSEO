import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css"; // Problems with scania-corporateUI so I made my own simple navbar

function Header() {
  return (
    <>
      <c-corporate-header
        site-name="Vehicle status"
        short-name="Vehicle status"
        site-url="/"
      ></c-corporate-header>

      <div className="navbar-container container">
        <NavLink to="/" activeClassName="active" className="navbar-element">
          Home
        </NavLink>

        <NavLink
          to="/customers"
          activeClassName="active"
          className="navbar-element"
        >
          Customers
        </NavLink>

        <NavLink
          to="/status"
          activeClassName="active"
          className="navbar-element"
        >
          Status
        </NavLink>
      </div>
    </>
  );
}

export default Header;
