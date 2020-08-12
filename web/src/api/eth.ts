import web3 from "@/utils/web3";

export async function getAccounts() {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    web3.eth.defaultAccount = accounts[0];
  }
  return accounts;
}

export async function getBalance(addr: string): Promise<string> {
  const wei = await web3.eth.getBalance(addr);
  return web3.utils.fromWei(wei);
}

export async function getCurrentAccount(): Promise<string | null> {
  const accounts = await getAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  } else {
    return null;
  }
}
