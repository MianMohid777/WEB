import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav style={{ backgroundColor: "beige" }}>
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

export default Header;
