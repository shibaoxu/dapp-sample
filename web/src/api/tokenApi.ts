import web3 from "@/utils/web3";
import { getCurrentAccount } from "./eth";
import config from "@/config.json";
import tokenFactoryAbi from "../abi/ERC20Factory.json";
import ERC20Abi from "../abi/ERC20.json";
import numeral from "numeral";

const tokenFactory = new web3.eth.Contract(
  // eslint-disable-next-line
  (tokenFactoryAbi as any).abi,
  config.contractAddress.tokenFactory,
);

export async function issueToken(token: {
  name: string;
  symbol: string;
  decimal: number;
  supply: number;
}) {
  await tokenFactory.methods
    .createERC20(token.supply, token.name, token.decimal, token.symbol)
    .send({ from: web3.eth.defaultAccount });
}

export async function getTokens() {
  const tokens = await tokenFactory.methods.getTokens().call();
  return tokens.map((token: any) => {
    return {
      name: token.name,
      symbol: token.symbol,
      decimal: token.decimal,
      totalSupply: token.totalSupply,
      creator: token.creator,
      addr: token.addr,
    };
  });
}

export async function getBalance(
  tokenAddress: string,
  account: string | null | undefined = web3.eth.defaultAccount as string,
): Promise<number> {
  if (!account) {
    account = await getCurrentAccount();
  }
  const token = new web3.eth.Contract((ERC20Abi as any).abi, tokenAddress);
  return await token.methods.balanceOf(account).call();
}

export async function getTokenSummary(
  addr: string,
): Promise<{
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  creator: string;
}> {
  const token = new web3.eth.Contract((ERC20Abi as any).abi, addr);
  return Promise.all([
    token.methods.name().call(),
    token.methods.symbol().call(),
    token.methods.decimals().call(),
    token.methods.totalSupply().call(),
    token.methods.owner().call(),
  ]).then(values => {
    return {
      name: values[0],
      symbol: values[1],
      decimals: values[2],
      totalSupply: numeral(values[3]).format("0,0"),
      creator: values[4],
    };
  });
}

export async function getAccountSummary(addr: string, account: string) {
  const token = new web3.eth.Contract((ERC20Abi as any).abi, addr);
  const balance = token.methods.balanceOf(account).call();
}

// export async function getAllowed(owner: string, spender: string) {}
