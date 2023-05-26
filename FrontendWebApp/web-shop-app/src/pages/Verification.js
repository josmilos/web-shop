import { Fragment } from "react";
import PageContent from "../components/PageContent";

const content = {
    title:'Verfiy New Sellers',
    description: 'Check and approve new sellers that are waiting for verification.'
  }

const VerificationPage = () => {
    return (<Fragment>
        <PageContent content={content}/>
    </Fragment>)
}

export default VerificationPage;