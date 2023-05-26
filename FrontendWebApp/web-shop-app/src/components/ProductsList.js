import { Fragment } from "react";
import ProductItem from "./ProductItem";

const ProductsList = ({products}) => {
  return (
    <Fragment>
      {products.map((product) => (
        <ProductItem product={product} key={product.id}></ProductItem>
      ))}
    </Fragment>
  );
};

export default ProductsList;
