import { ethers } from "ethers";
// ******** Services ********
import metamask from "./metamask";
// ******** Config ********
import MekaApesGameJSON from '../config/MekaApesGame.json';

const MEKAAPES_GAME_CONTRACT_ADDRESS =
  process.env.REACT_APP_MEKAAPES_GAME_CONTRACT_ADDRESS;

export class Contract {
  mekaApescontract = null;

  constructor() {
    this.mekaApesContract = new ethers.Contract(
      MEKAAPES_GAME_CONTRACT_ADDRESS,
      MekaApesGameJSON.abi,
      metamask.signer
    );
  }

  // gives mekaApe to the user
  async evolveBabyOoga(itemId) {
    return await this.mekaApesContract.evolveBabyOoga(itemId);
  }

  // applies only to pre-sale in ETH
  // mints amount new tokens to the user
  // toStake is boolean if is staked or not
  async mint(amount, toStake) {
    return await this.mekaApesContract.mint(amount, toStake);
  }

  // mints amount new tokens with $OG
  // toStake is boolean if is staked or not
  async mintWithOG(amount, toStake) {
    return await this.mekaApesContract.mintWithOG(amount, toStake);
  }

  // mints amount new tokens with $DMT
  async mintWithDMT(amount) {
    return await this.mekaApesContract.mintWithDMT(amount);
  }

  // stake multiple items
  async stake(itemList) {
    return await this.mekaApesContract.stake(itemList);
  }

  // unstake multiple items
  async unstake(itemList) {
    return await this.mekaApesContract.unstake(itemList);
  }

  // claim reward for multiple items
  async claimAvailableAmountMultipleTokens(itemList) {
    return await this.mekaApesContract.claimAvailableAmountMultipleTokens(itemList);
  }

  // level up Robo Ooga
  async levelUpRoboOooga(item) {
    return await this.mekaApesContract.levelUpRoboOooga(item);
  }

  // merge two Meka Apes, one will be burned, and another will be kept
  // the burned one will give Mega Meka Ape
  // the first argument is saved token
  // the second argument is burned token
  async mergeMekaApes(tokenIdSave, tokenIdBurn) {
    return await this.mekaApesContract.mergeMekaApes(tokenIdSave, tokenIdBurn);
  }
}

const contract = new Contract();

export default contract;
