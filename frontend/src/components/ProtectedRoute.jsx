import { Navigate } from "react-router-dom";

function ProtectedRoute({

  children,

  allowedRoles = []

}) {

  // GET TOKEN
  const token =
    localStorage.getItem("token");

  // GET ROLE
  const role =
    localStorage.getItem("role");

  // NOT LOGGED IN
  if (!token) {

    return <Navigate to="/" />;
  }

  // ROLE CHECK
  if (

    allowedRoles.length > 0 &&

    !allowedRoles.includes(role)

  ) {

    return <Navigate to="/dashboard" />;
  }

  // ACCESS GRANTED
  return children;
}

export default ProtectedRoute;