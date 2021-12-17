import { useState, createContext } from "react";

export const UserContext = createContext({
  userMetaMaskToken: null,
  saveUserMetaMaskToken: () => {},
  deleteUserMetaMaskToken: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userMetaMaskToken, setUserMetaMaskToken] = useState(null);

  const saveUserMetaMaskToken = (token) => {
    if (token) {
      setUserMetaMaskToken(token);
    }
  };

  const deleteUserMetaMaskToken = () => {
    setUserMetaMaskToken(null);
    localStorage.removeItem("mekaape_useraddress");
  };
  const contextValue = {
    userMetaMaskToken: userMetaMaskToken,
    saveUserMetaMaskToken: saveUserMetaMaskToken,
    deleteUserMetaMaskToken: deleteUserMetaMaskToken,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
