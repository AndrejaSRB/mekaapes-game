import { useState, createContext, useEffect } from "react";
// ******** Services ********
import contract from "../services/contract";

export const MintedContext = createContext({
  totalMintedTokens: 0,
  getTotalMinted: () => {},
});

const INTERVAL_PERIOD = 30000; // 30 seconds

const MintedContextProvider = ({ children }) => {
  const [totalMintedTokens, setTotalMinted] = useState(0);

  // Get the total minted number on interval
  useEffect(() => {
    let interval = setInterval(async () => {
      let balance = await contract.getTotalAmountMintedTokens();
      setTotalMinted(balance);
    }, INTERVAL_PERIOD);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTotalMinted = async () => {
    try {
      let balance = await contract.getTotalAmountMintedTokens();
      setTotalMinted(balance);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    totalMintedTokens: totalMintedTokens,
    getTotalMinted: getTotalMinted,
  };

  return (
    <MintedContext.Provider value={contextValue}>
      {children}
    </MintedContext.Provider>
  );
};

export default MintedContextProvider;
