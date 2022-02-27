import { useState, createContext, useContext, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
// ******** Stores ********
import { UserContext } from "./user-context";
// ******** Hooks ********
import useDMTBalance from "../hooks/Balance/useDMTBalance";
import useOGBalance from "../hooks/Balance/useOGBalance";

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
  const [DMTBalanceBigNumber, setDMTBalanceBigNumber] = useState(
    BigNumber.from(0)
  );
  const [OGBalanceBigNumber, setOGBalanceBigNumber] = useState(
    BigNumber.from(0)
  );
  const { data: dmtBalanceStatus, refetch: getDMTBalance } =
    useDMTBalance(userMetaMaskToken);
  const { data: ogBalanceStatus, refetch: getOGBalance } =
    useOGBalance(userMetaMaskToken);

  // Set $DMT balance
  useEffect(() => {
    if (dmtBalanceStatus !== null && dmtBalanceStatus !== undefined) {
      if (BigNumber.isBigNumber(dmtBalanceStatus)) {
        setDmtBalance(ethers.utils.formatUnits(dmtBalanceStatus));
      }
      setDMTBalanceBigNumber(dmtBalanceStatus);
    }
  }, [dmtBalanceStatus]);

  // Set $OG balance
  useEffect(() => {
    if (ogBalanceStatus !== null && ogBalanceStatus !== undefined) {
      if (BigNumber.isBigNumber(ogBalanceStatus)) {
        setoogearBalance(ethers.utils.formatUnits(ogBalanceStatus));
      }
      setOGBalanceBigNumber(ogBalanceStatus);
    }
  }, [ogBalanceStatus]);

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
    getDmtBalance: getDMTBalance,
    getOogearBalance: getOGBalance,
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
