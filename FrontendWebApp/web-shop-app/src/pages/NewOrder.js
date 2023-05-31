import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProductsList from "../components/ProductsList";
import { useLoaderData } from "react-router-dom";

const content = {
    title:'New Order',
    description: 'Create a new order by selecting one or more items that are listed below.'
  }
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
    const products = useLoaderData();
    return (<Fragment>
        <PageContent content={content}/>
        <ProductsList products={products}/>
    </Fragment>)
}

export default NewOrderPage;