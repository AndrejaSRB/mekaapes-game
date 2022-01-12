import { useQuery } from "react-query";

const OOGA_AWS_METADATA = process.env.REACT_APP_OOGA_AWS_METADATA;

const fetchItem = async (ape) => {
  if (ape.id && !ape.placeholder) {
    let response = await fetch(`${OOGA_AWS_METADATA}/${ape.id}.json`);
    return response.json();
  }
};

const useEvolveMetadata = (ape) => {
  return useQuery(["baby-oogas-metadata", ape], () => fetchItem(ape), {
    enabled: ape ? true : false,
  });
};

export default useEvolveMetadata;
