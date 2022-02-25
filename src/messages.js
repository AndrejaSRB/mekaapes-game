export const METAMASK_ERROR = "Metamask wallet not found. Please install it.";
export const APPROVE_DMT_TRANSACTION =
  "Please, first approve $DMT transaction.";
export const PRE_SALE_IS_ONGOING =
  "This function will be activated after the initial sale.";
export const DONT_ENOUGH_OG = "Sorry, you don't have enough $OG.";
export const DONT_ENOUGH_DMT = "Sorry, you don't have enough $DMT.";
export const DONT_ENOUGH_ETH = "Sorry, you don't have enough ETH.";
export const SELECT_SOME_UNSTAKED_APE = "You have to select some unstaked ape.";
export const SELECT_SOME_STAKED_APE = "You have to select some staked ape.";
export const SOMETHING_WENT_WRONG = "Transaction failed. :(";
export const SOMETHING_WENT_WRONG_UNSTAKE =
  "Transaction failed. :( Check your selected Robo Oogas if they accumulated min 2000 $OG.";
export const SELECT_CREW = "Please select some crew.";

// ******** Actions loading messages ********
export const ACTION_LOADING_CLAIM =
  "Claiming $OG is in progress. It might take a couple of minutes.";
export const ACTION_LOADING_MERGE =
  "Merging your MekaApes is in the progress. Your new Mega Meka will come soon. It could take a couple of minutes.";

export const ACTION_LOADING_CREW_CREATION = "Your Meka Crew gets created. It might take a couple of minutes.";
export const ACTION_LOADING_CREW_UPGRADE = "Your Meka Crew gets updated. This process might take a couple of minutes.";
export const ACTION_LOADING_CREW_REMOVE = "Removing NFTs from the Meka Crew in progess. This process might take a couple of minutes.";
export const ACTION_LOADING_CREW_CLAIM = "Claiming $OG is in progress. This process might take a couple of minutes.";
export const ACTION_BRUNING_ROBO = "Robo Ooga burn in progress. This process might take a couple of minutes.";

export const getActionLoadingUpgrade = (id) =>
  `Robo Ooga #${id} gets an upgrade! It will receive a new level soon. It might take a couple of minutes.`;

export const getActionLoadingStakeMessage = (list) => {
  if (list?.length > 1) {
    let number = list?.length;
    return `Your ${number} NFTs are sent to the Factory. This process might take a couple of minutes.`;
  } else {
    return "Your NFT is sent to the Factory. This process might take a couple of minutes.";
  }
};

export const getActionLoadingUnstakeMessage = (list) => {
  if (list?.length > 1) {
    let number = list?.length;
    return `Your ${number} NFTs are leaving the Factory. This process might take a couple of minutes.`;
  } else {
    return "Your NFT is leaving the Factory. This process might take a couple of minutes.";
  }
};

export const getActionLoadingEvolveMessage = (list) => {
  if (list?.length > 1) {
    return `Baby Ooga evolution in progress. Your new MekaApes are already on their way! It might take a couple of minutes.`;
  } else {
    return "Baby Ooga evolution in progress. Your new MekaApe is already on it’s way! It might take a couple of minutes.";
  }
};

export const getActionLoadingMintMessage = (amount) => {
  if (amount > 1) {
    return `Your ${amount} NFTs are getting minted. This process might take a couple of minutes. `;
  } else {
    return "Your NFT is getting minted. This process might take a couple of minutes.";
  }
};
