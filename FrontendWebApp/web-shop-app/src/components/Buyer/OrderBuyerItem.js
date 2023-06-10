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
import { Navigate, json, useNavigate } from "react-router-dom";
import { getAuthToken } from "../../service/UserService/AuthService";

const lessThanOneHourAgo = (date) => {
  return moment(date).isAfter(moment().subtract(1, "hours"));
};

const OrderBuyerItem = ({ order }) => {
  const navigate = useNavigate();
  const onCancelHandler = () => {
    if (lessThanOneHourAgo(order.orderDate) && order.status === "active") {
      cancelOrder(order);
    } else {
      console.log("PROSLO 1 SAT");
    }
  };

  const onDetailsHandler = () => {
    // prosledi ovde ovaj order

    navigate(`/dashboard/order-history/${order.orderId}`, { state: { order } });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          {order && order.status === "active" && (
            <TableBody>
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>
                  {moment(order.orderDate).format("DD-MM-YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {moment(order.deliveryTime).format("DD-MM-YYYY HH:mm:ss")}
                </TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={onDetailsHandler}>
                    Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onCancelHandler}
                    disabled={
                      order.status === "cancelled" ||
                      !lessThanOneHourAgo(order.orderDate)
                    }
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderBuyerItem;

export async function cancelOrder(props) {
  console.log("usao");
  const data = {
    orderId: 0,
    status: "cancelled",
  };

  const response = await fetch(
    "https://localhost:7108/api/orders/" + props.orderId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400 ||
    response.status === 403
  ) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not patch order." }, { status: 500 });
  }

  window.location.reload();
}
