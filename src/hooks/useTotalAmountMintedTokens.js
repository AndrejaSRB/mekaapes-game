import { useQuery } from "react-query";
// ******** Services ********
import contract from "../services/contract";

const INTERVAL_PERIOD = 300000; // 5min

const getTotalAmount = async () => {
  let amount = await contract.getTotalAmountMintedTokens();
  return amount.toNumber();
};

const useTotalAmountMintedTokens = (token) => {
  return useQuery("total-amount-minted-tokens", getTotalAmount, {
    enabled: token ? true : false,
    refetchInterval: INTERVAL_PERIOD,
  });
};

export default useTotalAmountMintedTokens;
