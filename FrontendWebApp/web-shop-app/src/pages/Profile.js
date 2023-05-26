import { Fragment } from "react";
import PageContent from "../components/PageContent";

const content = {
    title:'Your Profile',
    description: 'Check and change your details below.'
  }

const ProfilePage = () => {
    return (<Fragment>
        <PageContent content={content}/>
    </Fragment>)
}

export default ProfilePage;