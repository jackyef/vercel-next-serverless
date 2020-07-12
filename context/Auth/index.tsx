import * as React from 'react';
import { signin, signout, useSession } from 'next-auth/client';

interface UserData {
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData;
  loading: boolean;
  signout: typeof signout;
  signin: typeof signin;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    name: '',
    email: '',
  },
  loading: false,
  signin,
  signout,
};

export const AuthContext = React.createContext<AuthState>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [session, loading] = useSession();

  const authAPIs: AuthState = {
    isAuthenticated: Boolean(session),
    user: session?.user || initialState.user,
    loading,
    signin,
    signout,
  }

  return (
    <AuthContext.Provider value={authAPIs}>
      {children}
    </AuthContext.Provider>
  )
}