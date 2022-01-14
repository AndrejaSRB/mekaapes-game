import { useQuery } from "react-query";
// ******** Services ********
import contract from "../services/contract";

const getStatus = async (token, price) => {
  let status = await contract.isDMTtransactionApproved(token, price);
  return status;
};

const useIsDMTTransactionApproved = (token, price) => {
  return useQuery(
    ["dmt-transaction-approved", token, price],
    () => getStatus(token, price),
    {
      enabled:
        token && price !== undefined && price !== null
          ? true
          : false,
    }
  );
};

export default useIsDMTTransactionApproved;
