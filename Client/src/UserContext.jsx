import React, { createContext, useState } from 'react';
// Create a Context for the User state (name)
export const UserContext = createContext();
// Create a provider component
export const UserProvider = ({ children }) => {
  const [name, setUserName] = useState(''); // Initialize name state
  return (
    // The value prop holds the state and the function to update it
    <UserContext.Provider value={{ name, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
