import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  hash: string;
}

interface AuthContextData {
  user: {
    is_company?: boolean;
  };
  userSignIn(credentials: SignInCredentials): Promise<void>;
  companySignIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@workr:token');
    const user = localStorage.getItem('@workr:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const userSignIn = useCallback(async ({ email, hash }) => {
    const response = await api.post('sessions/users', {
      email,
      hash,
    });

    const { token, user } = response.data;

    localStorage.setItem('@workr:token', token);
    localStorage.setItem('@workr:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const companySignIn = useCallback(async ({ email, hash }) => {
    const response = await api.post('sessions/companies', {
      email,
      hash,
    });

    const { token, user } = response.data;

    localStorage.setItem('@workr:token', token);
    localStorage.setItem('@workr:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@workr:token');
    localStorage.removeItem('@workr:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, userSignIn, companySignIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
