import { useState, createContext, useContext } from "react";
// ******** Stores ********
import { UserContext } from "./user-context";

export const ClaimContext = createContext({
  claimBalance: null,
  getClaimBalance: () => {},
  clearClaimBalance: () => {},
});

const ClaimContextProvider = ({ children }) => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [claimBalance, setClaimBalance] = useState(0);

  const getClaimBalance = async () => {
    if (userMetaMaskToken) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setClaimBalance(Math.floor(Math.random() * (1000 - 1 + 1) + 1));
    }
  };

  const clearClaimBalance = () => {
    setClaimBalance(0);
  };

  const contextValue = {
    claimBalance: claimBalance,
    getClaimBalance: getClaimBalance,
    clearClaimBalance: clearClaimBalance,
  };

  return (
    <ClaimContext.Provider value={contextValue}>
      {children}
    </ClaimContext.Provider>
  );
};

export default ClaimContextProvider;
