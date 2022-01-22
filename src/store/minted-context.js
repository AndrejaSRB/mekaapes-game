import { useState, createContext, useEffect, useContext } from "react";
// ******** Stores ********
import { UserContext } from "./user-context";
// ******** Hooks ********
import useMintSale from "../hooks/useMintSale";
import usePublicSale from "../hooks/usePublicSale";

export const MintedContext = createContext({
  isMintSale: true,
    isPublicSale: false,
  getTotalMinted: () => {},
});

const MintedContextProvider = ({ children }) => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [isMintSale, setIsMintSale] = useState(true);
  const [isPublicSale, setIsPublicSale] = useState(false);
  const { data: status, refetch: getTotalMinted } =
    useMintSale(userMetaMaskToken);
  const { data: publicSaleStatus } = usePublicSale(userMetaMaskToken);

  // Get pre sale mint status
  useEffect(() => {
    if (status !== null && status !== undefined) {
      setIsMintSale(status);
    }
  }, [status]);

  // Get pre sale public mint status
  useEffect(() => {
    if (publicSaleStatus !== null && publicSaleStatus !== undefined) {
      setIsPublicSale(publicSaleStatus);
    }
  }, [publicSaleStatus]);

  const contextValue = {
    isMintSale: isMintSale,
    getTotalMinted: getTotalMinted,
    isPublicSale: isPublicSale,
  };

  return (
    <MintedContext.Provider value={contextValue}>
      {children}
    </MintedContext.Provider>
  );
};

export default MintedContextProvider;
