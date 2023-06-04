import { Fragment } from "react";
import AOrderItem from "./OrderItem";
import { useLoaderData } from "react-router-dom";

const AOrdersList = () => {
    const orders = useLoaderData();
    return (
        <Fragment>
            {orders.map((order) => (
                <AOrderItem order={order} key={order.orderId}/>
            ))}
        </Fragment>
    );
};


export default AOrdersList;