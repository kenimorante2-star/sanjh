import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ role, children }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const userRole = user?.publicMetadata?.role;

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireRole;
