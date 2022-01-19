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
  "Transaction failed. :( Check your selected Robo Oogas if they accumulated min 6000 $OG.";

// ******** Actions loading messages ********
export const ACTION_LOADING_CLAIM =
  "Claiming your $OG is in the progress. It could take a couple of minutes.";
export const ACTION_LOADING_MERGE =
  "Merging your Meka Apes is in the progress. Your new Mega Meka will come soon. It could take a couple of minutes.";
export const ACTION_LOADING_UPGRADE =
  "Upgrading your Robo Ooga is in the progress. He will receive a new level soon. It could take a couple of minutes.";

export const getActionLoadingStakeMessage = (list) => {
  if (list?.length > 1) {
    let number = list?.length;
    return `Staking your ${number} Oogas is in the progress. It could take a couple of minutes.`;
  } else {
    return "Staking your Ooga is in the progress. It could take a couple of minutes.";
  }
};

export const getActionLoadingUnstakeMessage = (list) => {
  if (list?.length > 1) {
    let number = list?.length;
    return `Unstaking your ${number} Oogas is in the progress. It could take a couple of minutes.`;
  } else {
    return "Unstaking your Ooga is in the progress. It could take a couple of minutes.";
  }
};

export const getActionLoadingEvolveMessage = (list) => {
  if (list?.length > 1) {
    let number = list?.length;
    return `Evolving your ${number} Baby Oogas is in the progress. Your new Meka Apes are on their way. It could take a couple of minutes.`;
  } else {
    return "Evolving your Baby Ooga is in the progress. Your new Meka Ape is on its way. It could take a couple of minutes.";
  }
};

export const getActionLoadingMintMessage = (amount) => {
  if (amount > 1) {
    return `Minting your new ${amount} Oogas is in the progress. It could take a couple of minutes.`;
  } else {
    return "Minting your new Ooga is in the progress. It could take a couple of minutes.";
  }
};
