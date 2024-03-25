import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <nav style={{ backgroundColor: "blue" }}>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Footer;
