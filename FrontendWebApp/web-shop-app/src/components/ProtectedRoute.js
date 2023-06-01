import { Navigate, Outlet } from "react-router-dom";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const ProtectedRoute = (props) => {
  //const {auth} = useContext(AuthContext);
  const auth = extractTokenData();

  return (
    <>
      {auth && props?.allowedRoles?.find((r) => auth.role?.includes(r)) ? (
        props.children
      ) : auth?.userId ? (
        <Navigate to="/unathorized" />
      ) : (
        <Navigate to="/log-in" />
      )}
    </>
  );
};

export default ProtectedRoute;
