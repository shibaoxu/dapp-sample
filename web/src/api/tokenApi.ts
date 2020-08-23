import web3 from "@/utils/web3";
import { getCurrentAccount } from "./eth";
import config from "@/config.json";
import tokenFactoryAbi from "../abi/ERC20Factory.json";
import ERC20Abi from "../abi/ERC20.json";
import { EventData } from "web3-eth-contract";

const tokenFactory = new web3.eth.Contract(
  // eslint-disable-next-line
  (tokenFactoryAbi as any).abi,
  config.contractAddress.tokenFactory,
);

export async function issueToken(token: {
  name: string;
  symbol: string;
  decimal: number;
  supply: string;
}) {
  return tokenFactory.methods
    .createERC20(token.supply, token.name, token.decimal, token.symbol)
    .send({ from: web3.eth.defaultAccount });
}

export interface TokenSummary {
  name: string;
  symbol: string;
  decimal: number;
  totalSupply: string;
  creator: string;
  addr: string;
  createTime?: string;
}

export async function getTokens(): Promise<TokenSummary[]> {
  const tokens = await tokenFactory.methods.getTokens().call();
  // eslint-disable-next-line
  return tokens.map((token: any) => {
    const tokenInfo: TokenSummary = {
      name: token.name,
      symbol: token.symbol,
      decimal: Number(token.decimal),
      totalSupply: web3.utils.fromWei(token.totalSupply),
      creator: token.creator,
      addr: token.addr,
      createTime: new Date(Number(token.createTime) * 1000).toLocaleString(),
    };
    return tokenInfo;
  });
}

export async function getBalance(
  tokenAddress: string,
  account: string | null | undefined = web3.eth.defaultAccount as string,
): Promise<string> {
  if (!account) {
    account = await getCurrentAccount();
  }
  // eslint-disable-next-line
  const token = new web3.eth.Contract((ERC20Abi as any).abi, tokenAddress);
  const balance = await token.methods.balanceOf(account).call();
  return web3.utils.fromWei(balance);
}

export async function getTokenSummary(addr: string): Promise<TokenSummary> {
  // eslint-disable-next-line
  const token = new web3.eth.Contract((ERC20Abi as any).abi, addr);
  return Promise.all([
    token.methods.name().call(),
    token.methods.symbol().call(),
    token.methods.decimals().call(),
    token.methods.totalSupply().call(),
    token.methods.owner().call(),
  ]).then(values => {
    const tokenSummary: TokenSummary = {
      name: values[0],
      symbol: values[1],
      decimal: Number(values[2]),
      totalSupply: web3.utils.fromWei(values[3]),
      creator: values[4],
      addr: addr,
    };
    return tokenSummary;
  });
}

export async function transfer(addr: string, to: string, amount: string) {
  // eslint-disable-next-line
  const account = await getCurrentAccount();
  // eslint-disable-next-line
  const token = new web3.eth.Contract((ERC20Abi as any).abi, addr);
  return token.methods.transfer(to, amount).send({ from: account });
  // token.methods.transfer(to, amount).send({ from: account });
}

export interface TransferEventLog {
  from: string;
  to: string;
  value: string;
  blockHash: string;
  blockNumber: number;
  timestamp: string;
}

async function getBlockTime(blockNumber: number): Promise<string> {
  const info = await web3.eth.getBlock(blockNumber);
  return new Date((info.timestamp as number) * 1000).toLocaleString();
}

async function assembleTransferEventLog(
  events: EventData[],
): Promise<TransferEventLog[]> {
  const assembledEvents: TransferEventLog[] = [];
  for (const event of events) {
    const block = await web3.eth.getBlock(event.blockNumber);
    assembledEvents.push({
      from: event.returnValues.from as string,
      to: event.returnValues.to as string,
      value: web3.utils.fromWei(event.returnValues.value).toString(),
      blockHash: event.blockHash,
      blockNumber: event.blockNumber,
      timestamp: new Date((block.timestamp as number) * 1000).toLocaleString(),
    });
  }
  return assembledEvents;
}

export async function getTransferRecords(
  addr: string,
  account?: string | null,
) {
  if (!account) {
    account = await getCurrentAccount();
  }
  const token = new web3.eth.Contract((ERC20Abi as any).abi, addr);
  const events = await token.getPastEvents("Transfer", {
    filter: {
      from: account as string,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
  return await assembleTransferEventLog(events);
}

export async function getReceiveRecords(addr: string, account?: string | null) {
  if (!account) {
    account = await getCurrentAccount();
  }
  const token = new web3.eth.Contract((ERC20Abi as any).abi, addr);
  const events = await token.getPastEvents("Transfer", {
    filter: {
      to: account as string,
    },
    fromBlock: 0,
    toBlock: "latest",
  });
  return await assembleTransferEventLog(events);
}
