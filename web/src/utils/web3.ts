import Web3 from "web3";

// eslint-disable-next-line
const ethereum = (window as any).ethereum;
ethereum.autoRefreshOnNetworkChange = false;
ethereum.enable();
export const isMetaMashInstalled = () => {
  return Boolean(ethereum && ethereum.isMetaMask);
};

const web3 = new Web3(ethereum);
ethereum
  .request({ method: "eth_requestAccounts" })
  .then((accounts: string[]) => {
    if (accounts.length > 0) {
      web3.eth.defaultAccount = accounts[0];
    }
  });
export default web3;
