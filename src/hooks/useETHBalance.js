import { useQuery } from "react-query";
// ******** Services ********
import metamask from "../services/metamask";

const getETHBalance = async (address) => {
  let balance = await metamask.getBalance(address);
  return balance;
};

const useETHBalance = (address) => {
  return useQuery(["eth-balance", address], () => getETHBalance(address), {
    enabled: address ? true : false,
  });
};

export default useETHBalance;
