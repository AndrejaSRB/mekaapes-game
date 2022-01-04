import { useState, createContext, useContext } from "react";
// ******** Stores ********
import { UserContext } from "./user-context";
// ******** Services ********
import contract from "../services/contract";

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
      try {
        let balance = await contract.getDMTBalance(userMetaMaskToken);
        setDmtBalance(balance);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getOogearBalance = async () => {
    if (userMetaMaskToken) {
      try {
        let balance = await contract.getOGBalance(userMetaMaskToken);
        setoogearBalance(balance);
      } catch (error) {
        console.log(error);
      }
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
