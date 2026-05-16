import React from "react";
import { Outlet } from "react-router-dom";
import Navbar2 from "./Navbar2";

function Layout2() {
  return (
    <>
      <Navbar2 />
      <Outlet />
    </>
  );
}

export default Layout2;