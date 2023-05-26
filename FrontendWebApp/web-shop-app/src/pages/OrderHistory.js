import { Fragment } from "react";
import PageContent from "../components/PageContent";

const content = {
    title:'Order History',
    description: 'Check your past orders.'
  }

const OrderHistoryPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
    </Fragment>)
}

export default OrderHistoryPage;