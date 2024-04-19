import {createContext, useState} from 'react';

export const userCreateContext = createContext();

export const UserContext = ({children}) => {
  const [userId, setUserId] = useState('');
  return <userCreateContext.Provider 
  value={{userId, setUserId}}
  >{children}</userCreateContext.Provider>;
};
