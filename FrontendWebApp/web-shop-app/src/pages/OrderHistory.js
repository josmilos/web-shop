import { Fragment } from "react";
import PageContent from "../components/PageContent";
import { getAuthToken } from "../service/UserService/AuthService";
import { json } from "react-router-dom";
import OrdersList from "../components/Buyer/OrdersList";

const content = {
    title:'Order History',
    description: 'Check your past orders.'
  }

const OrderHistoryPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
        <OrdersList/>
    </Fragment>)
}

export default OrderHistoryPage;

export async function loader({request, params}) {
    const response = await fetch('https://localhost:7108/api/orders/all', {
        headers: {
            "Authorization" : `Bearer ${getAuthToken()}`
        }
    });
  
    if(!response.ok){
        throw json({message: 'Could not fetch list of orders.'}, {
            status: 500
          })
    }
    else{
        const resData = await response.json();
        return resData;
    }
  }