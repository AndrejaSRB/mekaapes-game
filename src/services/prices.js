import { ethers } from "ethers";
// ******** Services ********
import metamask from "./metamask";
// ******** Config ********
import MekaApesGameJSON from "../config/MekaApesGame.json";

const MEKAAPES_GAME_CONTRACT_ADDRESS =
  process.env.REACT_APP_MEKAAPES_GAME_CONTRACT_ADDRESS;

export class Prices {
  mekaApescontract = null;

  constructor() {
    this.mekaApesContract = new ethers.Contract(
      MEKAAPES_GAME_CONTRACT_ADDRESS,
      MekaApesGameJSON.abi,
      metamask.signer
    );
  }

  async getMintPrice() {
    let price = await this.mekaApesContract.mintPrice();
    return price;
  }

  async getMintStakePrice() {
    let price = await this.mekaApesContract.mintStakePrice();
    return price;
  }

  async getMintOGprice() {
    let price = await this.mekaApesContract.mintOGprice();
    return price;
  }

  async getMintOGStakePrice() {
    let price = await this.mekaApesContract.mintOGstakePrice();
    return price;
  }

  async getMintDMTPrice() {
    let price = await this.mekaApesContract.mintDMTstakePrice();
    return price;
  }

  async getLevelUpPrice() {
    let price = await this.mekaApesContract.roboLevelupPrice();
    return price;
  }

  async getMekaMergePrice() {
    let price = await this.mekaApesContract.mekaMergePrice();
    return price;
  }
}

const prices = new Prices();

export default prices;
