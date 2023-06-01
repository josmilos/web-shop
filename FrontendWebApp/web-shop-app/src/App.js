import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import NewProductPage from "./pages/NewProduct";
import NewOrderPage from "./pages/NewOrder";
import OrderHistoryPage from "./pages/OrderHistory";
import VerificationPage from "./pages/Verification";
import PendingOrdersPage from "./pages/PendingOrders";
import AllOrdersPage from "./pages/AllOrders";
import {loader as profileLoader} from './service/UserService/ProfileService'
import {loader as productsLoader} from './service/ProductService/AllProductsService'
import {action as actionRegister} from './pages/SignUp';
import {action as actionLogin} from './pages/Login';
import {action as logoutAction} from './pages/Logout';
import {tokenLoader} from './service/UserService/AuthService'
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
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
        action: actionLogin
      },
      {
        path: "unathorized",
        element: <Unauthorized/>,
      },
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: <ProtectedRoute allowedRoles={["admin", "seller", "buyer"]}><DashboardPage /></ProtectedRoute>,
          },
          {
            path: "profile",
            element: <ProtectedRoute allowedRoles={["admin", "seller", "buyer"]}><ProfilePage /></ProtectedRoute> ,
            loader: profileLoader
          },
          {
            path: "new-product",
            element: <ProtectedRoute allowedRoles={["seller"]}><NewProductPage /></ProtectedRoute>,
          },
          {
            path: "new-order",
            element: <ProtectedRoute allowedRoles={["buyer"]}><NewOrderPage /></ProtectedRoute>,
            loader: productsLoader
          },
          {
            path: "order-history",
            element: <ProtectedRoute allowedRoles={["buyer"]}><OrderHistoryPage /></ProtectedRoute>,
            loader: () => {}
          },
          {
            path: "verification",
            element: <ProtectedRoute allowedRoles={["admin"]}><VerificationPage /></ProtectedRoute>,
            loader: () => {}
          },
          {
            path: "pending-orders",
            element: <ProtectedRoute allowedRoles={["seller"]}><PendingOrdersPage /></ProtectedRoute>,
            loader: () => {}
          },
          {
            path: "all-orders",
            element: <ProtectedRoute allowedRoles={["admin"]}><AllOrdersPage /></ProtectedRoute>,
            loader: () => {}
          },
        ],
      },
      {
        element: <Navigate to='/'/>,
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

