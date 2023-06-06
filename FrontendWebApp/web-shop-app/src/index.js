import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CartProvider from "./store/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="444900071031-po2acdnn7il0lus1tqmrda4373bps2f2.apps.googleusercontent.com">
    <React.StrictMode>
      <CartProvider>
      <App />
      </CartProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
