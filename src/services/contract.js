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

  // gives mekaApes to the user
  async evolveBabyOogas(itemIds, gasLimit) {
    return await this.mekaApesContract.evolveBabyOogas(itemIds, {
      gasLimit: gasLimit,
    });
  }

  // applies only to pre-sale in ETH
  // mints amount new tokens to the user
  // toStake is boolean if is staked or not
  // mintSign is signature object
  async mint(amount, toStake, value, mintSign) {
    return await this.mekaApesContract.mint(amount, toStake, mintSign, {
      value: value,
    });
  }

  async allowedToMint(address, mintAllowance) {
    return await this.mekaApesContract.allowedToMint(address, mintAllowance);
  }

  // mints amount new tokens with $OG
  // toStake is boolean if is staked or not
  async mintWithOG(amount, toStake, price, gasLimit) {
    return await this.mekaApesContract.mintWithOG(amount, toStake, {
      value: price,
      gasLimit: gasLimit,
    });
  }

  // mints amount new tokens with $DMT
  async mintWithDMT(amount, price, gasLimit) {
    return await this.mekaApesContract.mintWithDMT(amount, {
      value: price,
      gasLimit: gasLimit,
    });
  }

  // stake multiple items
  async stake(itemList, gasLimit) {
    return await this.mekaApesContract.stake(itemList, {
        gasLimit: gasLimit
    });
  }

  // unstake multiple items
  async unstake(itemList, price, gasLimit) {
    return await this.mekaApesContract.unstake(itemList, {
      value: price,
      gasLimit: gasLimit,
    });
  }

  // claim reward for multiple items
  async claimReward(itemList, gasLimit) {
    return await this.mekaApesContract.claimReward(itemList, {
        gasLimit: gasLimit
    });
  }

  // get $OG claimable amount for token list at same order as sent
  async claimAvailableAmountMultipleTokens(itemList) {
    return await this.mekaApesContract.claimAvailableAmountMultipleTokens(
      itemList
    );
  }

  // level up Robo Ooga
  async levelUpRoboOooga(item, gasLimit) {
    return await this.mekaApesContract.levelUpRoboOooga(item, {
      gasLimit: gasLimit,
    });
  }

  // merge two Meka Apes, one will be burned, and another will be kept
  // the burned one will give Mega Meka Ape
  // the first argument is saved token
  // the second argument is burned token
  async mergeMekaApes(tokenIdSave, tokenIdBurn, price, gasLimit) {
    return await this.mekaApesContract.mergeMekaApes(tokenIdSave, tokenIdBurn, {
      value: price,
      gasLimit: gasLimit,
    });
  }

  // total minted tokens
  async getTotalAmountMintedTokens() {
    return await this.mekaApesContract.totalMintedTokens();
  }

  // get mint public sale status (if it's live or done)
  async getMintPublicSaleStatus() {
    return await this.mekaApesContract.publicMintStarted();
  }

  // get mint sale status (if it's live or done)
  async getMintSaleStatus() {
    return await this.mekaApesContract.mintSale();
  }

  // total $DMT minted tokens
  async getTotalDMTMintedTokens() {
    let total = await this.mekaApesContract.tokensMintedWithDMT();
    return total.toNumber();
  }

  // total max mint with $DMT tokens
  async getMaxMintWithDMTTokens() {
    let total = await this.mekaApesContract.maxMintWithDMT();
    return total.toNumber();
  }

  // DMT_ERC20 Contract functions:

  async getDMTBalance(address) {
    if (address) {
      return await this.dmtERC20Contract.balanceOf(address);
    }
  }

  async approveDMTtransaction() {
    return await this.dmtERC20Contract.approve(
      MEKAAPES_GAME_CONTRACT_ADDRESS,
      APPROVE_AMOUNT
    );
  }

  async isDMTtransactionApproved(address, price) {
    let isApproved = await this.dmtERC20Contract.allowance(
      address,
      MEKAAPES_GAME_CONTRACT_ADDRESS
    );
    return isApproved.gt(price);
  }

  // OG_ERC20 Contract functions:

  async getOGBalance(address) {
    if (address) {
      return await this.ogERC20Contract.balanceOf(address);
    }
  }

  // Test functions

  // Get free baby oogas
  async freeBabyOogas(address) {
    return await this.mekaApesContract.freeMintManyBabyNext(address, 1);
  }
}

const contract = new Contract();

export default contract;
