import { useState, createContext, useEffect, useContext } from "react";
// ******** Stores ********
import { UserContext } from "./user-context";
// ******** Services ********
import contract from "../services/contract";
// ******** Hooks ********
import useMintSale from "../hooks/useMintSale";
import useTotalAmountMintedTokens from "../hooks/useTotalAmountMintedTokens";

export const MintedContext = createContext({
  totalMintedTokens: 0,
  isMintSale: true,
  getTotalMinted: () => {},
});

const MintedContextProvider = ({ children }) => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [totalMintedTokens, setTotalMinted] = useState(0);
  const [isMintSale, setIsMintSale] = useState(true);
  const { data: status } = useMintSale(userMetaMaskToken);
  const { data: amount } = useTotalAmountMintedTokens(userMetaMaskToken);

  // Get pre sale mint status
  useEffect(() => {
    if (status !== null && status !== undefined) {
      setIsMintSale(status);
    }
  }, [status]);

  // Get the total minted number on interval
  useEffect(() => {
    if (amount !== null && amount !== undefined) {
      setTotalMinted(amount);
    }
  }, [amount]);

  const getTotalMinted = async () => {
    try {
      await contract.getTotalAmountMintedTokens().then((balance) => {
        setTotalMinted(balance.toNumber());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    totalMintedTokens: totalMintedTokens,
    isMintSale: isMintSale,
    getTotalMinted: getTotalMinted,
  };

  return (
    <MintedContext.Provider value={contextValue}>
      {children}
    </MintedContext.Provider>
  );
};

export default MintedContextProvider;
