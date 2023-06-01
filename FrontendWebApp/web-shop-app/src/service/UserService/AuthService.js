import { redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { updateAuth } from "../../context/AuthProvider";


export function storeAuthToken(token){
    localStorage.setItem('token', token);
    const decodedToken = jwt_decode(token);
    console.log('EXTRACT')
    updateAuth({ decodedToken });
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
    console.log('EXTRACT')
    return decodedToken;
}