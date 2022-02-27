import { useState, createContext } from "react";

export const MintedContext = createContext({
  isMintSale: false,
  isPublicSale: false,
});

const MintedContextProvider = ({ children }) => {
  const [isMintSale] = useState(false);
  const [isPublicSale] = useState(false);

  const contextValue = {
    isMintSale: isMintSale,
    isPublicSale: isPublicSale,
  };

  return (
    <MintedContext.Provider value={contextValue}>
      {children}
    </MintedContext.Provider>
  );
};

export default MintedContextProvider;
