import * as React from 'react';
import Router from 'next/router';
import { AuthContext } from '../../context/Auth';
import { canUseDOM } from '../../utils/constants';

interface Props {
  fallback: React.ReactElement;
}

export const PrivateRoute: React.FC<Props> = ({ children, fallback }) => {
  const { isAuthenticated, loading, signin } = React.useContext(AuthContext);
  const currentPath = canUseDOM ? Router.pathname : '/';

  if (loading) {
    return fallback;
  }

  if (!isAuthenticated) {
    // redirect to login
    signin('google', { callbackUrl: currentPath });

    return null;
  }

  return <>{children}</>;
}
