import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import NewOrderPage from "./pages/NewOrder";
import OrderHistoryPage from "./pages/OrderHistory";
import VerificationPage, {
  loader as verificationLoader,
} from "./pages/Verification";
import PendingOrdersPage from "./pages/PendingOrders";
import AllOrdersPage from "./pages/AllOrders";
import { loader as profileLoader } from "./pages/Profile";
import { loader as productsLoader } from "./pages/NewOrder";
import { loader as ordersLoader } from "./pages/OrderHistory";
import { action as actionRegister } from "./pages/SignUp";
import { action as actionLogin } from "./pages/Login";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./service/UserService/AuthService";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Unverified from "./pages/Unverified";
import SellerProductsPage, {loader as sellerProductsLoader} from "./pages/SellerProducts";
import {action as actionNewProduct} from "./pages/NewProduct";
import NewProductPage from "./pages/NewProduct";
import EditSellerProductPage, {action as actionEditProduct}from "./pages/EditSellerProduct";
import SellerProductDetailPage, {loader as loaderProduct, action as actionDeleteProduct} from "./pages/SellerProductDetail"
import CartProvider from "./store/CartProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
        action: actionRegister,
      },
      {
        path: "log-in",
        element: <LogInPage />,
        action: actionLogin,
      },
      {
        path: "unathorized",
        element: <Unauthorized />,
      },
      {
        path: "unverified",
        element: <Unverified />,
      },
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={["admin", "seller", "buyer"]}>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute allowedRoles={["admin", "seller", "buyer"]}>
                <ProfilePage />
              </ProtectedRoute>
            ),
            loader: profileLoader,
          },
          {
            path: "my-products",
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <SellerProductsPage />
                  </ProtectedRoute>
                ),
                loader: sellerProductsLoader,
              },
              {
                path: ":productId",
                id: "product-detail",
                loader: loaderProduct,
                children: [
                  {
                    index: true,
                    element: (
                      <ProtectedRoute allowedRoles={["seller"]}>
                        <SellerProductDetailPage />
                      </ProtectedRoute>
                    ),
                    action: actionDeleteProduct,
                  },
                  {
                    path: "edit",
                    element: (
                      <ProtectedRoute allowedRoles={["seller"]}>
                        <EditSellerProductPage />
                      </ProtectedRoute>
                    ),
                    action: actionEditProduct
                  },
                ],
              },
              {
                path: "new-product",
                element: (
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <NewProductPage />
                  </ProtectedRoute>
                ),
                action: actionNewProduct,
              },
            ],
          },
          {
            path: "new-order",
            element: (
              <ProtectedRoute allowedRoles={["buyer"]}>
                <NewOrderPage />
              </ProtectedRoute>
            ),
            loader: productsLoader,
          },
          {
            path: "order-history",
            element: (
              <ProtectedRoute allowedRoles={["buyer", "seller"]}>
                <OrderHistoryPage />
              </ProtectedRoute>
            ),
            loader: ordersLoader,
          },
          {
            path: "verification",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <VerificationPage />
              </ProtectedRoute>
            ),
            loader: verificationLoader,
          },
          {
            path: "pending-orders",
            element: (
              <ProtectedRoute allowedRoles={["seller"]}>
                <PendingOrdersPage />
              </ProtectedRoute>
            ),
            loader: () => {},
          },
          {
            path: "all-orders",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllOrdersPage />
              </ProtectedRoute>
            ),
            loader: () => {},
          },
        ],
      },
      {
        element: <Navigate to="/" />,
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return <CartProvider><RouterProvider router={router} /></CartProvider>;
};

export default App;
