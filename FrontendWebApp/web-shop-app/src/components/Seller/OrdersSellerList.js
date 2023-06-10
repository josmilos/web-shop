import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import OrderSellerItem from "./OrderSellerItem";

const OrdersSellerList = (props) => {
  const orders = useLoaderData();
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Buyer ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Delivery Time</TableCell>
            <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {orders.map((order) => (
        <OrderSellerItem order={order} key={order.orderId} time = {props.time}></OrderSellerItem>
      ))}
    </Fragment>
  );
};

export default OrdersSellerList;
