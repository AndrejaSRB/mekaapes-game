import { ethers } from "ethers";
// ******** Services ********
import metamask from "./metamask";
// ******** Config ********
import MekaApesGame_2JSON from "../config/MekaApesGame_2.json";

const MEKAAPES_GAME_CONTRACT_ADDRESS =
  process.env.REACT_APP_MEKAAPES_GAME_CONTRACT_ADDRESS;

export class Contract {
  mekaApescontract = null;

  constructor() {
    this.mekaApesContract = new ethers.Contract(
      MEKAAPES_GAME_CONTRACT_ADDRESS,
      MekaApesGame_2JSON.abi,
      metamask.signer
    );
  }

  // MEKA CREWS
  // Check missing rewards
  async recoverOGClaimed(address, gasLimit) {
    return await this.mekaApesContract.recoverOGClaimed(address, {
      gasLimit: gasLimit,
    });
  }

  // Claim Crew Missing Reward
  async recoverLostOG(rewardSign, gasLimit) {
    return await this.mekaApesContract.recoverLostOG(rewardSign, {
      gasLimit: gasLimit,
    });
  }

  // create Crew
  async createCrew(tokenIds, gasLimit) {
    return await this.mekaApesContract.createCrew(tokenIds, {
      gasLimit: gasLimit,
    });
  }

  // remove Crew
  async removeCrew(crewId, gasLimit) {
    return await this.mekaApesContract.removeCrew(crewId, {
      gasLimit: gasLimit,
    });
  }

  // change Crew
  async changeCrew(crewId, addTokenIds, removeTokenIds, gasLimit) {
    return await this.mekaApesContract.changeCrew(
      crewId,
      addTokenIds,
      removeTokenIds,
      {
        gasLimit: gasLimit,
      }
    );
  }

  // Max Robo Oogas per crew for some Meka Level
  async getMaxCrewForMekaLevel(level) {
    let spots = await this.mekaApesContract.maxCrewForMekaLevel(level);
    return spots.toNumber();
  }

  // claim Crews reward
  async claimCrewReward(crewIds, gasLimit) {
    return await this.mekaApesContract.claimCrewReward(crewIds, {
      gasLimit: gasLimit,
    });
  }

  // Crew claim avaliable reward
  async claimAvailableAmountMultipleCrews(crewIds) {
    return await this.mekaApesContract.claimAvailableAmountMultipleCrews(
      crewIds
    );
  }

  // LEADERBOARD Claim

  // Claim Stage One Reward
  async claimLeaderbordReward(rewardSign, gasLimit) {
    return await this.mekaApesContract.claimLeaderbordReward(rewardSign, {
      gasLimit: gasLimit,
    });
  }

  // Check if user has reward from Stage 1
  async leaderboardRewardClaimed(address) {
    let reward = await this.mekaApesContract.leaderboardRewardClaimed(address);
    return ethers.utils.formatUnits(reward);
  }
}

const contract = new Contract();

export default contract;
