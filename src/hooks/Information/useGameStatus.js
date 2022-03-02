import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract";

const getStatus = async () => {
  let status = await contract.getGameStatus();
  return status;
};

const useGameStatus = (token) => {
  return useQuery("game-status", getStatus, {
    enabled: token ? true : false,
  });
};

export default useGameStatus;
