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
      // TODO: get the DMT Balance
      // TODO: save the result to the state
    }
  };

  const getOogearBalance = () => {
    if (userMetaMaskToken) {
      // TODO: get the DMT Balance | call contract and save OOGEAR Balance
      // TODO: save the result to the state
    }
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
