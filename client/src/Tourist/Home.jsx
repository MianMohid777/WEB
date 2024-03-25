import React from "react";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="/home/profile">This is Home Page</Link>
    </>
  );
}

export default Home;
