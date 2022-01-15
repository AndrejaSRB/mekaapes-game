import { useQuery } from "react-query";

const MEKAGAME_AWS_METADATA = process.env.REACT_APP_MEKAGAME_AWS_METADATA;

const fetchItem = async (ape) => {
  if (ape.id && !ape.placeholder) {
    let customId = 2002000 + +ape.id - 1000000;
    let response = await fetch(`${MEKAGAME_AWS_METADATA}/${customId}.json`);
    return response.json();
  }
};

const useApeMetadata = (ape) => {
  return useQuery(["ape-metadata", ape], () => fetchItem(ape), {
    enabled: ape && (ape.reward !== null || ape.reward !== undefined) ? true : false,
  });
};

export default useApeMetadata;
