import { Fragment } from "react";
import OrderItem from "./OrderItem";
import { useLoaderData } from "react-router-dom";

const OrdersList = () => {
  const orders = useLoaderData();
  return (
    <Fragment>
      {orders.map((order) => (
        <OrderItem order={order} key={order.orderId}></OrderItem>
      ))}
    </Fragment>
  );
};

export default OrdersList;

