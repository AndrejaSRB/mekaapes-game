import { useQuery } from "react-query";
import axios from "axios";

const PLAUSIBLE_TOKEN = process.env.REACT_APP_PLAUSIBLE_TOKEN;
const PLAUSIBLE_SITE_ID = process.env.REACT_APP_PLAUSIBLE_SITE_ID;

const getDailyUsers = async () => {
  let response = await axios.get(
    `https://plausible.io/api/v1/stats/aggregate?visit=day&site_id=${PLAUSIBLE_SITE_ID}&period=day&metrics=visitors`,
    {
      headers: {
        Authorization: `Bearer ${PLAUSIBLE_TOKEN}`,
      },
    }
  );
  console.log('response', response);
  let visitors = 0;
  if(response?.results?.visitors?.value !== undefined && response?.results?.visitors?.value !== null){
      visitors = response?.results?.visitors?.value;
  }
  return visitors;
};

const useDailyUsers = () => {
  return useQuery("daily-users", getDailyUsers);
};

export default useDailyUsers;
