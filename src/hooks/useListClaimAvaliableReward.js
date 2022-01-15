import { useQuery } from "react-query";
import { BigNumber, ethers } from "ethers";
// ******** Services ********
import contract from "../services/contract";

const INTERVAL_PERIOD = 60000; // 1min

const getAmount = async (tokenList) => {
  let tokenIds = [];
  if (tokenList && tokenList.length > 0) {
    tokenList.forEach((token) => {
      tokenIds.push(token.id);
    });
  }
  let list = await contract.claimAvailableAmountMultipleTokens(tokenIds);
  let tokens = [];
  if (list?.length > 0) {
    list.forEach((item, index) => {
      let ape = {
        ...tokenList[index],
      };
      if (BigNumber.isBigNumber(item)) {
        ape.reward = ethers.utils.formatUnits(item);
      } else {
        ape.reward = 0;
      }
      tokens.push(ape);
    });
  }
  return tokens;
};

const useListClaimAvaliableReward = (tokenList) => {
  return useQuery(
    ["total-list-claim-avaliable-amount", tokenList],
    () => getAmount(tokenList),
    {
      enabled:
        tokenList?.length > 0 ? true : false,
      refetchInterval: INTERVAL_PERIOD,
    }
  );
};

export default useListClaimAvaliableReward;
