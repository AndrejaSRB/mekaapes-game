import { useState, createContext, useEffect, useContext } from "react";
// ******** Stores ********
import { UserContext } from "./user-context";
// ******** Services ********
import contract from "../services/contract";

export const MintedContext = createContext({
  totalMintedTokens: 0,
  getTotalMinted: () => {},
});

const INTERVAL_PERIOD = 30000; // 30 seconds


//TOOD Get if the mint sale is live
const MintedContextProvider = ({ children }) => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [totalMintedTokens, setTotalMinted] = useState(0);
//   const [isMintSale, setIsMintSale] = useState(false);
//
//   useEffect(() => {
//     if (userMetaMaskToken) {
//       const getMintStatus = async () => {
//         let status = await contract.getMintSaleStatus();
//         setIsMintSale(status);
//       };
//       getMintStatus();
//       let interval = setInterval(async () => {
//         let status = await contract.getMintSaleStatus();
//         setIsMintSale(status);
//       }, INTERVAL_PERIOD);
//       return () => {
//         clearInterval(interval);
//       };
//     }
//   }, [userMetaMaskToken]);

  // Get the total minted number on interval
  useEffect(() => {
    if (userMetaMaskToken) {
      let interval = setInterval(async () => {
        let balance = await contract.getTotalAmountMintedTokens();
        setTotalMinted(balance);
      }, INTERVAL_PERIOD);
      return () => {
        clearInterval(interval);
      };
    }
  }, [userMetaMaskToken]);

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
