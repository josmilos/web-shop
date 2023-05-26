import { Fragment } from "react";
import ProductItem from "./ProductItem";

const ProductsList = (products) => {
  return (
    <Fragment>
      {products.map((product) => (
        <ProductItem product={product}></ProductItem>
      ))}
    </Fragment>
  );
};

export default ProductsList;
