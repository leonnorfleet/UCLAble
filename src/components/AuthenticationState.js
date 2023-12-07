
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


// Create an AuthContext
const AuthContext = createContext();

// Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated 
    const token = localStorage.getItem('authToken');
    if (token) {
      // Fetch user profile 
      const userData = getUserDataFromToken(token);
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const login = (userData) => {
    // Save the user data and token 
    localStorage.setItem('authToken', userData.token);
    setUser(userData);
  };

  const logout = () => {
    // Remove the user data and token 
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
  const userData = jwtDecode(token);
  return userData; 
};
