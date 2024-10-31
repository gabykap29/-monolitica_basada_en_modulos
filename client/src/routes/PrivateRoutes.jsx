import { useContext, } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  const token = localStorage.getItem("token")

  if(auth.isAuthenticated === false && token) {
    return <h2>Loading...</h2>
  }

  return token ? children : <Navigate to={"/"} />;
};

export default PrivateRoute;
