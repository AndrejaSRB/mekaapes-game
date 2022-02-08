import { useQuery } from "react-query";
// ******** Services ********
import contract from "../services/contract";

const getAmount = async () => {
  let total = await contract.getMaxMintWithDMTTokens();
  return total;
};

const useMaxMintWithDMT = () => {
  return useQuery("max-amount-dmt-tokens", getAmount);
};

export default useMaxMintWithDMT;
