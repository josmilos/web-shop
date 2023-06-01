import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import SellerItem from "./SellerItem";

const SellersList = () => {
  const sellers = useLoaderData();
  return (
    <Fragment>
      {sellers.map((seller) => (
        <SellerItem order={seller} key={seller.id}></SellerItem>
      ))}
    </Fragment>
  );
};

export default SellersList;

