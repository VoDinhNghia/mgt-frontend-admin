import { Navigate } from "react-router-dom";
import { routes, userRoles } from "../constants/constant";
import { getCurrentUser } from "../services/authService";

const ProtectedRouter = ({ children }) => {
  const user = getCurrentUser();
  if (
    user?.role === userRoles.SUPPER_ADMIN ||
    user?.role === userRoles.ADMIN
  ) {
    return children;
  }
  return <Navigate to={routes.login} replace />;
};

export default ProtectedRouter;
