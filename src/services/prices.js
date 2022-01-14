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

  async getPrices() {
    return await this.mekaApesContract.getPrices();
  }
}

const prices = new Prices();

export default prices;
