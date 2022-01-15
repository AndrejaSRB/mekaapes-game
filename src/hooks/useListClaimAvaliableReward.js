import { useQuery } from "react-query";
// ******** Services ********
import contract from "../services/contract";

const INTERVAL_PERIOD = 60000; // 1min

const getAmount = async (tokenList) => {
  let balance = await contract.claimAvailableAmountMultipleTokens(tokenList);
  return balance;
};

const useListClaimAvaliableReward = (tokenList) => {
  return useQuery(
    ["total-list-claim-avaliable-amount", tokenList],
    () => getAmount(tokenList),
    {
      enabled: tokenList ? true : false,
      refetchInterval: INTERVAL_PERIOD,
    }
  );
};

export default useListClaimAvaliableReward;
