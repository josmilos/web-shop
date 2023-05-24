import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import React, { Fragment } from "react";

const RootLayout = () => {
  return <Fragment>
    <MainNavigation/>
        <main>
            <Outlet/>
        </main>
  </Fragment>
};

export default RootLayout;
