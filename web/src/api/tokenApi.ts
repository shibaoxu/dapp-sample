import web3 from "@/utils/web3";
import config from "@/config.json";
import tokenFactoryAbi from "../abi/ERC20Factory.json";
import ERC20Abi from "../abi/ERC20.json";

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

export async function getBalance(tokenAddress: string, account: string):Promise<number> {
  const token = new web3.eth.Contract((ERC20Abi as any).abi, tokenAddress);
  return await token.methods.balanceOf(account).call()
}

// export async function getAllowed(owner: string, spender: string) {}
