import { useQuery } from "react-query";
import { BigNumber, ethers } from "ethers";
// ******** Services ********
import contract from "../../services/contract_2";

const INTERVAL_PERIOD = 60000; // 1min

const getCrewRewardAmount = async (crewList) => {
  const crewIds = crewList.map((crew) => crew.id);
  let amountList = await contract.claimAvailableAmountMultipleCrews(crewIds);

  const crews = [];
  crewList.forEach((crew, index) => {
    let item = {
      ...crew,
    };
    let number = amountList[index];
    if (BigNumber.isBigNumber(number)) {
      item.reward = ethers.utils.formatUnits(number);
    } else {
      item.reward = 0;
    }
    crews.push(item);
  });
  return crews;
};

const useCrewClaimAvaliableReward = (crewList) => {
  return useQuery(
    ["total-list-claim-avaliable-amount", crewList],
    () => getCrewRewardAmount(crewList),
    {
      enabled: crewList?.length > 0 ? true : false,
      refetchInterval: INTERVAL_PERIOD,
    }
  );
};

export default useCrewClaimAvaliableReward;
