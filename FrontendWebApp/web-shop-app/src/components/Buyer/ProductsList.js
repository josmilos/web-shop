import { Fragment } from "react";
import ProductItem from "./ProductItem";
import { useLoaderData } from "react-router-dom";

const ProductsList = () => {
  const products = useLoaderData();
  return (
    <Fragment>
      {products.map((product) => (
        <ProductItem product={product} key={product.id}></ProductItem>
      ))}
    </Fragment>
  );
};

export default ProductsList;
