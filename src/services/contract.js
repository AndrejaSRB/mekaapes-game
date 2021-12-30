import { ethers } from "ethers";
// ******** Services ********
import metamask from "./metamask";

const MEKAAPES_GAME_CONTRACT_ADDRESS =
  process.env.REACT_APP_MEKAAPES_GAME_CONTRACT_ADDRESS;

export class Contract {
  contract = null;

  constructor() {
    this.contract = new ethers.Contract(
      MEKAAPES_GAME_CONTRACT_ADDRESS,
      MEKAAPES_GAME_CONTRACT_ADDRESS.abi,
      metamask.signer
    );
  }

  // gives mekaApe to the user
  async evolveBabyOoga(itemId) {
    return await this.contract.evolveBabyOoga(itemId);
  }

  // applies only to pre-sale in ETH
  // mints amount new tokens to the user
  async mint(amount) {
    return await this.contract.mint(amount);
  }

  // mints amount new tokens with $OG
  async mintWithOG(amount) {
    return await this.contract.mintWithOG(amount);
  }

  // mints amount new tokens with $OG and Stake tokens
  async mintWithOGandStake(amount) {
    return await this.contract.mintWithOGandStake(amount);
  }

  // mints amount new tokens with $DMT
  async mintWithDMT(amount) {
    return await this.contract.mintWithDMT(amount);
  }

  // stake multiple items
  async stake(itemList) {
    return await this.contract.stake(itemList);
  }

  // unstake multiple items
  async unstake(itemList) {
    return await this.contract.unstake(itemList);
  }

  // claim reward for multiple items
  async claim(itemList) {
    return await this.contract.claim(itemList);
  }

  // level up Robo Ooga
  async levelUpRoboOooga(item) {
    return await this.contract.levelUpRoboOooga(item);
  }

  // merge two Meka Apes, one will be burned, and another will be kept
  // the burned one will give Mega Meka Ape
  // the first argument is saved token
  // the second argument is burned token
  async mergeMekaApe(tokenIdSave, tokenIdBurn) {
    return await this.contract.mergeMekaApe(tokenIdSave, tokenIdBurn);
  }
}

const contract = new Contract();

export default contract;
