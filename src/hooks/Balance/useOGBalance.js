import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract";

const getBalance = async (address) => {
  let balance = await contract.getOGBalance(address);
  return balance;
};

const useOGBalance = (address) => {
  return useQuery(["og-balance", address], () => getBalance(address), {
    enabled: address ? true : false,
  });
};

export default useOGBalance;
