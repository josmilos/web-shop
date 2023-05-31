import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import React, { Fragment, useEffect } from "react";
import { getTokenDuration } from "../service/UserService/AuthService";

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
