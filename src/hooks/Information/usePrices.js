import { useQuery } from "react-query";
// ******** Services ********
import prices from "../../services/prices";

const getAllPrices = async () => {
  let allPrices = await prices.getPrices();
  return allPrices;
};

const usePrices = (token) => {
  return useQuery("prices", getAllPrices, {
    enabled: token ? true : false,
  });
};

export default usePrices;
