import { useState, createContext, useEffect, useContext } from "react";
// ******** Stores ********
import { UserContext } from "./user-context";
// ******** Hooks ********
import useMintSale from "../hooks/useMintSale";

export const MintedContext = createContext({
  isMintSale: true,
  getTotalMinted: () => {},
});

const MintedContextProvider = ({ children }) => {
  const { userMetaMaskToken } = useContext(UserContext);
  const [isMintSale, setIsMintSale] = useState(true);
  const { data: status, refetch: getTotalMinted } = useMintSale(userMetaMaskToken);

  // Get pre sale mint status
  useEffect(() => {
    if (status !== null && status !== undefined) {
      setIsMintSale(status);
    }
  }, [status]);

  const contextValue = {
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
