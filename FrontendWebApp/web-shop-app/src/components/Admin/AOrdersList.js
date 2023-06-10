import { Fragment } from "react";
import AOrderItem from "./AOrderItem";
import { useLoaderData } from "react-router-dom";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";

const AOrdersList = () => {
  const orders = useLoaderData();
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Buyer ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell></TableCell>
          </TableHead>
        </Table>
      </TableContainer>
      {orders.map((order) => (
        <AOrderItem order={order} key={order.orderId} />
      ))}
    </Fragment>
  );
};

export default AOrdersList;
