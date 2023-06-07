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
  Button,
} from "@mui/material";
import moment from "moment/moment";

const OrderItem = ({order}) => {

  return (
    <div>
        <TableContainer component={Paper}>
          <Table>
      {order ? (
        
            <TableBody>
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{moment(order.orderDate).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{moment(order.deliveryTime).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell><Button variant="contained">Cancel</Button></TableCell>
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
