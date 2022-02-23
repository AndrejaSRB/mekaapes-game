import { useQuery } from "react-query";
// ******** Services ********
import contract from "../services/contract";

const getCredits = async (address) => {
  let balance = await contract.getUnstakeCreditsForAddress(address);
  return balance;
};

const useBurnCredits = (address) => {
  return useQuery(["burn-credits", address], () => getCredits(address), {
    enabled: address ? true : false,
  });
};

export default useBurnCredits;
