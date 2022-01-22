import { ethers } from "ethers";

export class Metamask {
  provider = null;
  signer = null;
  ethereum = window.ethereum;

  constructor() {
    if (this.ethereum) {
      this.provider = new ethers.providers.Web3Provider(this.ethereum);
      this.signer = this.provider.getSigner();
    }
  }

  async getUserAddress() {
    await this.provider.send("eth_requestAccounts", []);
    const address = await this.signer.getAddress();

    localStorage.setItem("mekaape_useraddress", address);

    return address;
  }

  async getChainId() {
    const chainId = await this.provider.getNetwork();
    return chainId;
  }

  async getBalance(address) {
    return await this.provider.getBalance(address);
  }

  checkMetamaskConnection() {
    if (this.ethereum) {
      this.ethereum.on("chainChanged", (res) => {
        localStorage.removeItem("mekaape_useraddress");
        window.location.reload();
      });
      this.ethereum.on("accountsChanged", (accounts) => {
        if (accounts && accounts.length === 0) {
          localStorage.removeItem("mekaape_useraddress");
          window.location.reload();
        } else if (accounts && accounts.length > 0) {
          localStorage.setItem("mekaape_useraddress", accounts[0]);
          window.location.reload();
        }
      });
    }
  }

  async isMetaMaskConnected() {
    if (this.provider) {
      const accounts = await this.provider.listAccounts();
      return accounts.length > 0;
    }
  }
}

export default new Metamask();
