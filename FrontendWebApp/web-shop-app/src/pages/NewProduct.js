import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProductForm from "../components/Seller/ProductForm";

const content = {
    title:'Add New Product',
    description: 'Create a new product and add it to the shop. Fill in the necessary data in the form below.'
  }

const NewProductPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
        <ProductForm/>
    </Fragment>)
}

export default NewProductPage;