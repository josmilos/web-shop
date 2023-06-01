import { Navigate } from "react-router-dom";
import { extractTokenData, getAuthToken } from "../service/UserService/AuthService";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = (props) => {
    const {auth} = useAuth();
    console.log(auth)
    return (
        auth?.role?.find(r => props.allowedRoles?.includes(r))
            ? props.children
            : auth?.userId  
                ? <Navigate to='/unathorized'/>
                : <Navigate to='/log-in'/>
    )
}

export default ProtectedRoute;