import { useState, createContext, useContext } from "react";
import { ethers, BigNumber } from "ethers";
// ******** Stores ********
import { UserContext } from "./user-context";
// ******** Services ********
import contract from "../services/contract";

export const BalanceContext = createContext({
  dmtBalance: null,
  oogearBalance: null,
  DMTBalanceBigNumber: 0,
  OGBalanceBigNumber: 0,
  clearDmtBalance: () => {},
  clearOogearBalance: () => {},
  getDmtBalance: () => {},
  getOogearBalance: () => {},
});

const BalanceContextProvider = ({ children }) => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [dmtBalance, setDmtBalance] = useState(0);
  const [oogearBalance, setoogearBalance] = useState(0);
  const [DMTBalanceBigNumber, setDMTBalanceBigNumber] = useState(BigNumber.from(0));
  const [OGBalanceBigNumber, setOGBalanceBigNumber] = useState(BigNumber.from(0));

  const getDmtBalance = async () => {
    if (userMetaMaskToken) {
      try {
        await contract.getDMTBalance(userMetaMaskToken).then((response) => {
          let balance = ethers.utils.formatUnits(response);
          setDmtBalance(balance);
          setDMTBalanceBigNumber(response);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getOogearBalance = async () => {
    if (userMetaMaskToken) {
      try {
        await contract.getOGBalance(userMetaMaskToken).then((response) => {
          let balance = ethers.utils.formatUnits(response);
          setoogearBalance(balance);
          setOGBalanceBigNumber(response);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearDmtBalance = () => {
    setDmtBalance(0);
    setDMTBalanceBigNumber(BigNumber.from(0));
  };

  const clearOogearBalance = () => {
    setoogearBalance(0);
    setOGBalanceBigNumber(BigNumber.from(0));
  };

  const contextValue = {
    dmtBalance: dmtBalance,
    oogearBalance: oogearBalance,
    clearDmtBalance: clearDmtBalance,
    clearOogearBalance: clearOogearBalance,
    getDmtBalance: getDmtBalance,
    getOogearBalance: getOogearBalance,
    DMTBalanceBigNumber: DMTBalanceBigNumber,
    OGBalanceBigNumber: OGBalanceBigNumber,
  };

  return (
    <BalanceContext.Provider value={contextValue}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceContextProvider;
