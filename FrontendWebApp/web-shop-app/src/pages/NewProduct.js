import { Fragment } from "react";
import PageContent from "../components/PageContent";

const content = {
    title:'Add New Product',
    description: 'Create a new product and add it to the shop. Fill in the necessary data in the form below.'
  }

const NewProductPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
    </Fragment>)
}

export default NewProductPage;