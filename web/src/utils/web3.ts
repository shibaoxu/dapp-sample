import Web3 from "web3";

// eslint-disable-next-lin
const ethereum = (window as any).ethereum;
ethereum.autoRefreshOnNetworkChange = false;
ethereum.enable();
export const isMetaMashInstalled = () => {
  return Boolean(ethereum && ethereum.isMetaMask);
};

const web3 = new Web3(ethereum);
export default web3;
