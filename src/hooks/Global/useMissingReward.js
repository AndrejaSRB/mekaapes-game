import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract_2";
// ******** Function ********
import { beautifyPrice } from "../../pages/Game/Factory/helper";

const getCrewMissingReward = async (address) => {
  let reward = await contract.recoverOGClaimed(address);
  if (+beautifyPrice(+reward) === 0) {
    return true;
  } else {
    return false;
  }
};

const useMissingReward = (address) => {
  return useQuery(
    ["get-missing-crew-reward", address],
    () => getCrewMissingReward(address),
    {
      enabled: address ? true : false,
    }
  );
};

export default useMissingReward;
