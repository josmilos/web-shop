import { Fragment } from "react";
import PageContent from "../components/PageContent";

const content = {
    title:'Pending Orders',
    description: 'Check your orders that are awaiting to be shipped.'
  }

const PendingOrdersPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
    </Fragment>)
}

export default PendingOrdersPage;