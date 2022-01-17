import { useQuery } from "react-query";

const MEKAGAME_AWS_METADATA = process.env.REACT_APP_MEKAGAME_AWS_METADATA;
const ORIGIN = process.env.REACT_APP_ORIGIN;

const fetchItem = async (ape) => {
  if (ape.id && !ape.placeholder) {
    let customId = 2002000 + +ape.id;
    let response = await fetch(`${MEKAGAME_AWS_METADATA}/${customId}.json`, {
      method: "GET",
      headers: {
        Origin: ORIGIN,
      },
    });
    return response.json();
  }
};

const useApeMetadata = (ape) => {
  return useQuery(["ape-metadata", ape], () => fetchItem(ape), {
    enabled:
      ape && (ape.reward !== null || ape.reward !== undefined) ? true : false,
  });
};

export default useApeMetadata;
