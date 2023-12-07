import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const userData = getUserDataFromToken(token);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        logout(); 
      }
    }
  }, []);

  const login = (token) => { 
    localStorage.setItem('authToken', token);
    try {
      const decodedData = jwtDecode(token); 
      setUser(decodedData); 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const getUserDataFromToken = (token) => {
  try {
    const userData = jwtDecode(token);
    return userData; // Return the decoded user data
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
