import * as React from 'react';
import { AuthContext } from '../../context/Auth';

interface Props {
  fallback: React.ReactElement;
}

export const PrivateRoute: React.FC<Props> = ({ children, fallback }) => {
  const { isAuthenticated, loading, signin } = React.useContext(AuthContext);

  if (loading) {
    return fallback;
  }

  if (!isAuthenticated) {
    // redirect to login
    signin();

    return null;
  }

  return <>{children}</>;
}
