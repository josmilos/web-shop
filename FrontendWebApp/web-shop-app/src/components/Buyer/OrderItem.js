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

const OrderItem = ({order}) => {

  return (
    <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delivery Time</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
      {order ? (
        
            <TableBody>
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.deliveryTime}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>Action</TableCell>
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

export default OrderItem;
