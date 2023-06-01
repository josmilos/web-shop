import React, { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const updateAuth = (newAuth) => {
    const updatedAuth = {
      role: newAuth.role || '',
      userId: newAuth.userId || '',
      // Add other required properties if needed
    };

    setAuth(updatedAuth);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const updateAuth = (newAuth) => {
  // This function is exported separately
  // You can use it to update the auth value from other files
  // Make sure to import the setAuth function
  // and set the auth value accordingly
};
