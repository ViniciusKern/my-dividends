import { User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../firebase/services/AuthService';

type AuthData = {
  loggedUser: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateLoggedUser = (user: User | null) => {
      setLoggedUser(user);
      setIsLoading(false);
    };

    const unsubscribe = AuthService.onLoggedUserChange(updateLoggedUser);

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ loggedUser, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
