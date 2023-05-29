import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import SignUpPage, {actionRegister} from "./pages/SignUp";
import LogInPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import NewProductPage from "./pages/NewProduct";
import NewOrderPage from "./pages/NewOrder";
import OrderHistoryPage from "./pages/OrderHistory";
import VerificationPage from "./pages/Verification";
import PendingOrdersPage from "./pages/PendingOrders";
import AllOrdersPage from "./pages/AllOrders";

//import {actionRegister} from './service/UserService';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
        action: actionRegister
      },
      {
        path: "log-in",
        element: <LogInPage />,
      },
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "new-product",
            element: <NewProductPage />,
          },
          {
            path: "new-order",
            element: <NewOrderPage />,
          },
          {
            path: "order-history",
            element: <OrderHistoryPage />,
          },
          {
            path: "verification",
            element: <VerificationPage />,
          },
          {
            path: "pending-orders",
            element: <PendingOrdersPage />,
          },
          {
            path: "all-orders",
            element: <AllOrdersPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

