import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract";
// ******** Function ********
import { beautifyPrice } from "../../pages/Game/Factory/helper";

const getStageOneReward = async (address) => {
  let reward = await contract.leaderboardRewardClaimed(address);
  if (+(beautifyPrice(+reward)) === 0) {
    return true;
  } else {
    return false;
  }
};

const useStageOneReward = (address) => {
  return useQuery(
    ["get-stage-one-reward", address],
    () => getStageOneReward(address),
    {
      enabled: address ? true : false,
    }
  );
};

export default useStageOneReward;
