export const REQUEST_RANDOM = "RequestRandoms";
export const MEKA_CONVERT = "MekaConvert";
export const OOGA_ATTACKED = "OogaAttacked";
export const MINT_MULTIPLE_ROBO = "MintMultipleRobo";
export const MEKA_MERGE = "MegaMerged";
export const CLAIM_REWARD = "ClaimReward";
export const ATTACK_REWARD = "AttackReward";
export const BABY_EVOLVE = "BabyOogaEvolve";
export const LEVELUP_ROBO = "LevelUpRoboOoga";
export const TAX_REWARD = "TaxReward";

export const getEvent = (receipt, contract, eventName) => {
  const randomRequestTopic = contract.interface.getEventTopic(eventName);
  const event = receipt.logs.find(
    (x) => x.topics.indexOf(randomRequestTopic) >= 0
  );
  const parsedEvent = contract.interface.parseLog(event);
  return parsedEvent;
};

export const getAllEvents = (receipt, contract, eventName) => {
  const randomRequestTopic = contract.interface.getEventTopic(eventName);
  const events = receipt.logs.filter(
    (x) => x.topics.indexOf(randomRequestTopic) >= 0
  );
  const parsedEvents = events.map((x) => contract.interface.parseLog(x));
  return parsedEvents;
};

export const makeRandomSubscription = (receipt, contract, callbackFunction) => {
  let { mekaApesContract } = contract;
  let randomRequestEvent = getEvent(receipt, mekaApesContract, REQUEST_RANDOM);
  let randomRequestId = randomRequestEvent?.args?.requestId;

  let eventFilter = mekaApesContract.filters.ReceiveRandoms(randomRequestId);
  mekaApesContract.once(eventFilter, callbackFunction);
};
