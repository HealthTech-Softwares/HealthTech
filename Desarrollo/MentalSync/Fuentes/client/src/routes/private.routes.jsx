import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../pages/Loading';

export const PrivateRoute = ({ requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  console.log(user);
  console.log(isAuthenticated);

  if (loading) return <Loading />;
  
  if (!isAuthenticated) return <Navigate to="/" replace />;

  if (user.rol !== requiredRole) return <Navigate to="/403" replace />;

  return <Outlet />;
};
