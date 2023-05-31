import { Autocomplete } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { json, redirect, useActionData } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { storeAuthToken } from "../service/UserService/AuthService";



//const today = dayjs(new Date.date)


const SignUp = () => {
  return (
    <SignUpForm></SignUpForm>
  )

};

export default SignUp;

export async function action({ request}) {
  const data = await request.formData();

  const userData = {
    userId: 0,
    userName: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    address: data.get("address"),
    dateOfBirth: data.get("date"),
    userType: data.get("type").toLocaleLowerCase(),
    image: data.get("img"),
    verification: "",
    orders: [],
  };

  const response = await fetch("https://localhost:7108/api/users/register", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  });

  if(response.status === 422 || response.status === 401 || response.status === 400){
    return response;
  }
  if(!response.ok){
    throw json(
      { message: "Could not authenticate user." },
      { status: 500 },
    );
  }

  const resData = await response.json();
  const token = resData.token;

  storeAuthToken(token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 0.5);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/dashboard');
}
