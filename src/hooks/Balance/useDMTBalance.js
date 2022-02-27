import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract";

const getBalance = async (address) => {
  let balance = await contract.getDMTBalance(address);
  return balance;
};

const useDMTBalance = (address) => {
  return useQuery(["dmt-balance", address], () => getBalance(address), {
    enabled: address ? true : false,
  });
};

export default useDMTBalance;
