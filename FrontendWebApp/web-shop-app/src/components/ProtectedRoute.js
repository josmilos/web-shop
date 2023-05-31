import { Navigate } from "react-router-dom";
import { getAuthToken } from "../service/UserService/AuthService";

const ProtectedRoute = (props) => {
    const token = getAuthToken();
    if(!token){
        return <Navigate to='/log-in'/>
    }
    else{
        return props.children;
    }
}

export default ProtectedRoute;