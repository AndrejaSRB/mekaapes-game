import { ethers } from "ethers";
// ******** Services ********
import metamask from "./metamask";
// ******** Config ********
import MekaApesGameJSON from "../config/MekaApesGame.json";

const MEKAAPES_GAME_CONTRACT_ADDRESS =
  process.env.REACT_APP_MEKAAPES_GAME_CONTRACT_ADDRESS;

export class Gas {
  mekaApescontract = null;

  constructor() {
    this.mekaApesContract = new ethers.Contract(
      MEKAAPES_GAME_CONTRACT_ADDRESS,
      MekaApesGameJSON.abi,
      metamask.signer
    );
  }

  async getMintRandomGas(amount, isStake) {
    let gas = await this.mekaApesContract.mintRandomGas(amount, isStake);
    return gas;
  }

  async getMergeRandomGas() {
    let gas = await this.mekaApesContract.mergeRandomGas();
    return gas;
  }

  async getUnstakeRandomGas(amount) {
    let gas = await this.mekaApesContract.unstakeRandomGas(amount);
    return gas;
  }
}

const gas = new Gas();

export default gas;
