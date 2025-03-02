import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute = () => {
  const token = useAuth()

  return token ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute;