import { useQuery } from "react-query";
import axios from "axios";

const OOGA_AWS_METADATA = process.env.REACT_APP_OOGA_AWS_METADATA;
const ORIGIN = process.env.REACT_APP_ORIGIN;

const fetchItem = async (ape) => {
  if (ape.id && !ape.placeholder) {
    let response = await axios.get(`${OOGA_AWS_METADATA}/${ape.id}.json`, {
      headers: {
        "Access-Control-Allow-Origin": ORIGIN,
      },
    });
    return response.data;
  }
};

const useEvolveMetadata = (ape) => {
  return useQuery(["baby-oogas-metadata", ape], () => fetchItem(ape), {
    enabled: ape ? true : false,
  });
};

export default useEvolveMetadata;
