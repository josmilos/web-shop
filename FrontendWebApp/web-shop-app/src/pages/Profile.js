import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProfileOverview from "../components/ProfileOverview";

const content = {
    title:'Your Profile',
    description: 'Check and change your details below.'
  }

const ProfilePage = () => {
    return (<Fragment>
        <PageContent content={content}/>
        <ProfileOverview/>
    </Fragment>)
}

export default ProfilePage;