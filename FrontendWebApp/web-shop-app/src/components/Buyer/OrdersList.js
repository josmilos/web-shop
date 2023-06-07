import { Fragment } from "react";
import OrderItem from "./OrderItem";
import { useLoaderData } from "react-router-dom";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrdersList = () => {
  const orders = useLoaderData();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Delivery Time</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell></TableCell>
          </TableHead>
        </Table>
      </TableContainer>
      {orders.map((order) => (
        <OrderItem order={order} key={order.orderId}></OrderItem>
      ))}
    </Fragment>
  );
};

export default OrdersList;
