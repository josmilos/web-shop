import { Fragment } from "react";
import PageContent from "../components/PageContent";

const content = {
    title:'All Created Orders',
    description: 'Here you can see all orders created on the website. This window can be seen only by admin.'
  }

const AllOrdersPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
    </Fragment>)
}

export default AllOrdersPage;