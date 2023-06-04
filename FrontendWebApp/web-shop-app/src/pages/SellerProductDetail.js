import { Fragment } from "react";
import ProductForm from "../components/Seller/ProductForm";
import { extractTokenData, getAuthToken } from "../service/UserService/AuthService";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import SProductOverwiev from "../components/Seller/SProductOverwiev";

const SellerProductDetailPage = () => {
    const product = useRouteLoaderData('product-detail');
    return (<Fragment>
        <SProductOverwiev product={product}/>
    </Fragment>)
}

export default SellerProductDetailPage;

export async function loader({ request, params }) {
    const id = params.productId
    const response = await fetch("https://localhost:7108/api/products/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected user." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }

  export async function action({ params, request }) {
    const productId = params.productId;
    console.log(productId)
    const response = await fetch('https://localhost:7108/api/products/' + productId, {
      method: request.method,
    });
  
    if (!response.ok) {
      throw json(
        { message: 'Could not delete product.' },
        {
          status: 500,
        }
      );
    }
    return redirect('/dashboard/my-products')
  }