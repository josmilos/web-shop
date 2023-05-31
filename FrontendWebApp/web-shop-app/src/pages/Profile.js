import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import PageContent from "../components/PageContent";
import ProfileOverview from "../components/ProfileOverview";

const content = {
    title:'Your Profile',
    description: 'Check and change your details below.'
  }

const ProfilePage = () => {
    const user = useLoaderData();
    return (<Fragment>
        <PageContent content={content}/>
        <ProfileOverview user={user}/>
    </Fragment>)
}

export default ProfilePage;