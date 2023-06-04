import { Fragment } from "react";
import PageContent from "../components/PageContent";
import ProfileOverview from "../components/ProfileOverview";
import { json } from "react-router-dom";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";

const content = {
  title: "Your Profile",
  description: "Check and change your details below.",
};

const ProfilePage = () => {
  return (
    <Fragment>
      <PageContent content={content} />
      <ProfileOverview />
    </Fragment>
  );
};

export default ProfilePage;

export async function loader({ request, params }) {
  const user = extractTokenData();
  const id = user["userId"];
  const response = await fetch("https://localhost:7108/api/users/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected user." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log(resData)
    return resData;
  }
}
