import React from "react";
import { Link, NavLink } from "react-router-dom";

function DashBoard() {
  return (
    <>
      <nav style={{ backgroundColor: "beige" }}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DashBoard;
