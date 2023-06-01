import { redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";


export function storeAuthToken(token){
    localStorage.setItem('token', token);
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0){
        return 'EXPIRED';
    }

    return token;
}

export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();

    return duration;
}

export function tokenLoader() {
    return getAuthToken();
}


export function extractTokenData(){
    const token = getAuthToken();
    const decodedToken = jwt_decode(token);
    const tokenData ={
        "role": decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        "userId": decodedToken.userId
    }
    return tokenData;
}