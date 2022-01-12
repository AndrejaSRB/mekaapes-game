import { useQuery } from "react-query";
// ******** Services ********
import contract from "../services/contract";

const INTERVAL_PERIOD = 60000;

const getMintStatus = async () => {
  let status = await contract.getMintSaleStatus();
  return status;
};

const useMintSale = (token) => {
  return useQuery("mint-status", getMintStatus, {
    enabled: token ? true : false,
    refetchInterval: INTERVAL_PERIOD,
  });
};

export default useMintSale;
