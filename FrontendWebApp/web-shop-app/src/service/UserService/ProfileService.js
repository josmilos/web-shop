import {json } from "react-router-dom";

export async function loader({request, params}) {
    const id = params.userId;
    const response = await fetch('https://localhost:7108/api/users/' + id);

    if(!response.ok){
        throw json({message: 'Could not fetch details for selected user.'}, {
            status: 500
          })
    }
    else{
        return response;
    }
}
