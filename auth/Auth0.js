// auth/Auth0.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth0Context = createContext();

export const Auth0Provider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    token: null,
    user: null
  });

  const auth0ClientId = 'jXKeVXkNyKAFE5QNGzQg2PAdJHcTPVmN';
  const auth0Domain = 'dev-sq58e7544vi1qqx0.us.auth0.com';

  const authUrl = `https://${auth0Domain}/authorize?response_type=token&client_id=${auth0ClientId}&scope=openid profile email&redirect_uri=${AuthSession.makeRedirectUri({ useProxy: true })}`;

  const login = async () => {
    const response = await AuthSession.startAsync({ authUrl });
    if (response.type === 'success' && response.params.access_token) {
      handleResponse(response.params.access_token);
    }
  };

  const handleResponse = async (token) => {
    const user = jwtDecode(token);
    setAuthState({ isLoading: false, token, user });
    await AsyncStorage.setItem('userToken', token);
  };

  const logout = () => {
    setAuthState({ isLoading: false, token: null, user: null });
    AsyncStorage.removeItem('userToken');
  };

  useEffect(() => {
    const checkLoginState = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setAuthState({ isLoading: false, token, user: jwtDecode(token) });
      } else {
        setAuthState({ isLoading: false, token: null, user: null });
      }
    };

    checkLoginState();
  }, []);

  return (
    <Auth0Context.Provider value={{ authState, login, logout }}>
      {children}
    </Auth0Context.Provider>
  );
};

export const useAuth0 = () => useContext(Auth0Context);
