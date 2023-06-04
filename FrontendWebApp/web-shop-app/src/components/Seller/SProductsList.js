import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import SProductItem from "./SProductItem";

const SProductsList = () => {
    const products = useLoaderData();
    return (
    <Fragment>
        {products.map((product) => <SProductItem product={product} key ={product.productId}></SProductItem>)}
    </Fragment>)
}

export default SProductsList;