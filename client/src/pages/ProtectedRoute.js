import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  //* get current user if any from app state
  const { user } = useAppContext();

  //* if no user present that navigate landing
  if (!user) {
    return <Navigate to="/landing" />;
  }
  //* if user is present than display children components
  return children;
};

export default ProtectedRoute;
