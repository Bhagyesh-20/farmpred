import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
    let { user } = useContext(AuthContext);
    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
