import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract";
// ******** JSON ********
import whitelistJSON from "../config/whitelistMintSignatures.json";

const getMaxTokenAmount = async (address) => {
  let maxAmount = 0;
  if (address) {
    if (whitelistJSON && whitelistJSON.length > 0) {
      let isWhitelisted = whitelistJSON.find(
        (users) => users.address.toLowerCase() === address.toLowerCase()
      );
      if (isWhitelisted) {
        const { mintSign } = isWhitelisted;
        maxAmount = mintSign.mintAllowance;
      }
    }
  }

  let response = await contract.allowedToMint(address, maxAmount);
  return +response.toString();
};

const useMaxTokenAmount = (address) => {
  return useQuery(
    ["max-token-amount", address],
    () => getMaxTokenAmount(address),
    {
      enabled: address ? true : false,
    }
  );
};

export default useMaxTokenAmount;
