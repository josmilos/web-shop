import React from "react";
import { Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { extractTokenData } from "../../service/UserService/AuthService";

const OrderBuyerDetail = () => {
  const location = useLocation();
  const { userType } = extractTokenData();
  const { order } = location.state;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Order Details</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Order Information</Typography>
        <Typography>Order ID: {order.orderId}</Typography>
        <Typography>Comment: {order.comment}</Typography>
        <Typography>Address: {order.address}</Typography>
        <Typography>
          Order Date: {new Date(order.orderDate).toLocaleString()}
        </Typography>
        {userType === "seller" && (
          <Typography>Buyer ID: {order.userBuyerId}</Typography>
        )}

        <Typography>Total Amount: {order.totalAmount}</Typography>
        <Typography>Status: {order.status}</Typography>
        <Typography>
          Delivery Time: {new Date(order.deliveryTime).toLocaleString()}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Products</Typography>
        {order.products.map((product) => (
          <div key={product.productId}>
            <Typography>Product ID: {product.productId}</Typography>
            <Typography>Name: {product.name}</Typography>
            <Typography>Description: {product.description}</Typography>
            <Typography>Price: {product.price}</Typography>
            <Typography>Quantity: {product.quantity}</Typography>
            <Typography>Image: {product.image}</Typography>
            {userType === "buyer" && (
              <Typography>Seller ID: {product.sellerId}</Typography>
            )}
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default OrderBuyerDetail;
