import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <c-corporate-header
        site-name="Vehicle status"
        short-name="Vehicle status"
        site-url="/"
      ></c-corporate-header>

      <c-main-navigation>
        <primary-items>
          <nav-item>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </nav-item>
          <nav-item>
            <NavLink to="/customers" activeClassName="active">
              Customers
            </NavLink>
          </nav-item>
          <nav-item>
            <NavLink to="/status" activeClassName="active">
              Status
            </NavLink>
          </nav-item>
        </primary-items>
      </c-main-navigation>
    </>
  );
}

export default Header;
