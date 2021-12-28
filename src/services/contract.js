// import { ethers } from "ethers";
// ******** Services ********
// import metamask from "./metamask";

export class Contract {
  erc20Contract = null;
  erc721Contract = null;
  erc1155Contract = null;

  // constructor() {
  //   this.erc20Contract = new ethers.Contract(
  //     ERC20_CONTRACT_ADDRESS,
  //     ERC20.abi,
  //     metamask.signer,
  //   );
  //   this.erc721Contract = new ethers.Contract(
  //     ERC721_CONTRACT_ADDRESS,
  //     ERC721.abi,
  //     metamask.signer,
  //   );
  //   this.erc1155Contract = new ethers.Contract(
  //     ERC1155_CONTRACT_ADDRESS,
  //     ERC1155.abi,
  //     metamask.signer,
  //   );
  // }

  //   // gives mekaApe to the user
  //   async evolveBabyOoga(itemId) {
  //     return await this.erc721Contract.evolveBabyOoga(itemId);
  //   }
  //
  //   // applies only to pre-sale in ETH
  //   // mints amount new tokens to the user
  //   async mint(amount) {
  //     return await this.erc721Contract.mint(amount);
  //   }
  //
  //   // mints amount new tokens with $OG
  //   async mintWithOG(amount) {
  //     return await this.erc721Contract.mintWithOG(amount);
  //   }
  //
  //   // mints amount new tokens with $OG and Stake tokens
  //   async mintWithOGandStake(amount) {
  //     return await this.erc721Contract.mintWithOGandStake(amount);
  //   }
  //
  //   // mints amount new tokens with $DMT
  //   async mintWithDMT(amount) {
  //     return await this.erc721Contract.mintWithDMT(amount);
  //   }
  //
  //   // stake multiple items
  //   async stake(itemList) {
  //     return await this.erc721Contract.stake(itemList);
  //   }
  //
  //   // unstake multiple items
  //   async unstake(itemList) {
  //     return await this.erc721Contract.unstake(itemList);
  //   }
  //
  //   // claim reward for multiple items
  //   async claim(itemList) {
  //     return await this.erc721Contract.claim(itemList);
  //   }
  //
  //   // level up Robo Ooga
  //   async levelUpRoboOooga(item) {
  //     return await this.erc721Contract.levelUpRoboOooga(item);
  //   }
  //
  //   // merge two Meka Apes, one will be burned, and another will be kept
  //   // the burned one will give Mega Meka Ape
  //   // the first argument is saved token
  //   // the second argument is burned token
  //   async mergeMekaApe(tokenIdSave, tokenIdBurn) {
  //     return await this.erc721Contract.mergeMekaApe(tokenIdSave, tokenIdBurn);
  //   }
}

const contract = new Contract();

export default contract;
