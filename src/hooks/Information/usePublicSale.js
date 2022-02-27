import { useQuery } from "react-query";
// ******** Services ********
import contract from "../../services/contract";

const getPublicSaleStatus = async () => {
  let status = await contract.getMintPublicSaleStatus();
  return status;
};

const usePublicSale = (token) => {
  return useQuery("public-mint-status", getPublicSaleStatus, {
    enabled: token ? true : false,
  });
};

export default usePublicSale;
