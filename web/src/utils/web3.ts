import Web3 from "web3";

// eslint-disable-next-lin
const ethereum = (window as any).ethereum;
export const isMetaMashInstalled = () => {
  return Boolean(ethereum && ethereum.isMetaMask);
};

const web3 = new Web3(ethereum);

export async function getAccounts() {
  return await web3.eth.getAccounts();
}

export default web3;
