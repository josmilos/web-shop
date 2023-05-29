import { json, redirect } from "react-router-dom";

export async function actionRegister({ request }) {
    console.log("Problem")
  const data = await request.formData();
  const authData = {
    userName: data.get('username'),
    email: data.get('email'),
    password: data.get('password'),
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    address: data.get('address'),
    dateOfBirth: data.get('date'),
    userType: data.get('type'),
    image: data.get('img'),
    verification: "",
    orders: [],
  };

  const response = await fetch('http://localhost:5120/api/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData)
  });

  if(!response.ok){
    throw json({message: 'Could not authenticate user.'}, {status: 500});
  }

  return redirect('/');
}
