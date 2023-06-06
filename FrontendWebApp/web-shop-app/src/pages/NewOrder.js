import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProductsList from "../components/Buyer/ProductsList";
import { json } from "react-router-dom";
import { getAuthToken } from "../service/UserService/AuthService";
import CartProvider from "../store/CartProvider";

const content = {
  title: "New Order",
  description:
    "Create a new order by selecting one or more items that are listed below.",
};
/*
const products = [
    {
        id: "p1",
        name: 'Product1',
        description: 'Description of product one',
        price: '$22.99',
        quantity: 5
    },
    {
        id: "p2",
        name: 'Product2',
        description: 'Description of product two',
        price: '$12.99',
        quantity: 2
    },
    {
        id: "p3",
        name: 'Product3',
        description: 'Description of product three',
        price: '$99.99',
        quantity: 3
    }
]
*/
const NewOrderPage = () => {
  return (
    <Fragment>
      <PageContent content={content} />
      <CartProvider>
        <ProductsList />
      </CartProvider>
    </Fragment>
  );
};

export default NewOrderPage;

export async function loader({ request, params }) {
  const response = await fetch("https://localhost:7108/api/products/all", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch list of products." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
}
