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
import OrderBuyerItem from "./OrderBuyerItem";

const OrdersBuyerList = () => {
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
          </TableHead>
        </Table>
      </TableContainer>
      {orders.map((order) => (
        <OrderBuyerItem order={order} key={order.orderId}></OrderBuyerItem>
      ))}
    </Fragment>
  );
};

export default OrdersBuyerList;
