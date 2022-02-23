import { useQuery } from "react-query";
import { BigNumber, ethers } from "ethers";
// ******** Services ********
import contract from "../services/contract";

const INTERVAL_PERIOD = 60000; // 1min

const getAmount = async (tokenList, listWithoutPlaceholders) => {
  let tokenIds = [];
  if (listWithoutPlaceholders && listWithoutPlaceholders.length > 0) {
    listWithoutPlaceholders.forEach((token) => {
      tokenIds.push(token.id);
    });
  }
  let list = await contract.claimAvailableAmountMultipleTokens(tokenIds);
  let tokens = [];
  if (tokenList?.length > 0) {
    tokenList.forEach((item, index) => {
      let ape = {
        ...item,
      };
      let number = list[index];
      if (BigNumber.isBigNumber(number)) {
        ape.reward = ethers.utils.formatUnits(number);
      } else {
        ape.reward = 0;
      }
      tokens.push(ape);
    });
  }
  return tokens;
};

const useListClaimAvaliableReward = (tokenList, listWithoutPlaceholders) => {
  return useQuery(
    ["total-list-claim-avaliable-amount", tokenList, listWithoutPlaceholders],
    () => getAmount(tokenList, listWithoutPlaceholders),
    {
      enabled:
        tokenList?.length > 0 && listWithoutPlaceholders?.length > 0
          ? true
          : false,
      refetchInterval: INTERVAL_PERIOD,
    }
  );
};

export default useListClaimAvaliableReward;
