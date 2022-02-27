import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract";

const getAmount = async () => {
  let allPrices = await contract.getTotalDMTMintedTokens();
  return allPrices;
};

const useTotalMintedDMTTokens = () => {
  return useQuery("total-dmt-tokens", getAmount);
};

export default useTotalMintedDMTTokens;
