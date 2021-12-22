import { useState, createContext, useContext } from "react";
// ******** Stores ********
import { UserContext } from "./user-context";

export const BalanceContext = createContext({
  dmtBalance: null,
  oogearBalance: null,
  clearDmtBalance: () => {},
  clearOogearBalance: () => {},
  getDmtBalance: () => {},
  getOogearBalance: () => {},
});

const BalanceContextProvider = ({ children }) => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [dmtBalance, setDmtBalance] = useState(0);
  const [oogearBalance, setoogearBalance] = useState(0);

  const getDmtBalance = async () => {
    if (userMetaMaskToken) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setDmtBalance(Math.floor(Math.random() * (1000 - 1 + 1) + 1));
    }
  };

  const getOogearBalance = () => {
    // TODO
    // call contract and save OOGEAR Balance
  };

  const clearDmtBalance = () => {
    setDmtBalance(0);
  };

  const clearOogearBalance = () => {
    setoogearBalance(0);
  };

  const contextValue = {
    dmtBalance: dmtBalance,
    oogearBalance: oogearBalance,
    clearDmtBalance: clearDmtBalance,
    clearOogearBalance: clearOogearBalance,
    getDmtBalance: getDmtBalance,
    getOogearBalance: getOogearBalance,
  };

  return (
    <BalanceContext.Provider value={contextValue}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceContextProvider;
