import { useQuery } from "react-query";
// ******** Services ********
import contract from "../services/contract";

const INTERVAL_PERIOD = 60000; // 1min

const getAmount = async (tokenList) => {
  let balance = await contract.claimReward(tokenList);
  return balance;
};

const useTotalClaimReward = (tokenList) => {
  return useQuery(
    ["total-claim-reward", tokenList],
    () => getAmount(tokenList),
    {
      enabled: tokenList ? true : false,
      refetchInterval: INTERVAL_PERIOD,
    }
  );
};

export default useTotalClaimReward;
