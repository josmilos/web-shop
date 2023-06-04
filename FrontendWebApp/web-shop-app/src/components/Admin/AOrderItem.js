import React from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const AOrderItem = ({ order }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Buyer</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {order ? (
            <TableBody>
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.userBuyer.userId}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            ""
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default AOrderItem;
