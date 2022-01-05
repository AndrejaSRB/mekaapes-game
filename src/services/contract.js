import { ethers } from "ethers";
// ******** Services ********
import metamask from "./metamask";
// ******** Config ********
import MekaApesGameJSON from "../config/MekaApesGame.json";
import DMT_ERC20JSON from "../config/DMT_ERC20.json";
import OG_ERC20JSON from "../config/OG_ERC20.json";

const MEKAAPES_GAME_CONTRACT_ADDRESS =
  process.env.REACT_APP_MEKAAPES_GAME_CONTRACT_ADDRESS;
const DMT_ERC20_CONTRACT_ADDRESS =
  process.env.REACT_APP_DMT_ERC20_CONTRACT_ADDRESS;
const OG_ERC20_CONTRACT_ADDRESS =
  process.env.REACT_APP_OG_ERC20_CONTRACT_ADDRESS;

const APPROVE_AMOUNT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"; //(2^256 - 1 )

//TODO: call prices from MekaApesGame contract
export class Contract {
  mekaApescontract = null;
  dmtERC20Contract = null;
  ogERC20Contract = null;

  constructor() {
    this.mekaApesContract = new ethers.Contract(
      MEKAAPES_GAME_CONTRACT_ADDRESS,
      MekaApesGameJSON.abi,
      metamask.signer
    );
    this.dmtERC20Contract = new ethers.Contract(
      DMT_ERC20_CONTRACT_ADDRESS,
      DMT_ERC20JSON.abi,
      metamask.signer
    );
    this.ogERC20Contract = new ethers.Contract(
      OG_ERC20_CONTRACT_ADDRESS,
      OG_ERC20JSON.abi,
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

  async allowedToMint(address) {
    return await this.mekaApesContract.allowedToMint(address);
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
    return await this.mekaApesContract.claimAvailableAmountMultipleTokens(
      itemList
    );
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

  // DMT_ERC20 Contract functions:

  async getDMTBalance(address) {
    const balance = await this.dmtERC20Contract.balanceOf(address);
    return ethers.utils.formatUnits(balance);
  }

  async approveDMTtransaction() {
    return await this.dmtERC20Contract.approve(DMT_ERC20_CONTRACT_ADDRESS, APPROVE_AMOUNT);
  }

  async isDMTtransactionApproved(address, price) {
    let isApproved = await this.dmtERC20Contract.allowance(
      address,
      DMT_ERC20_CONTRACT_ADDRESS
    );
    return +isApproved.toString() > +price;
  }

  // OG_ERC20 Contract functions:

  async getOGBalance(address) {
    const balance = await this.ogERC20Contract.balanceOf(address);
    return ethers.utils.formatUnits(balance);
  }
}

const contract = new Contract();

export default contract;
