import web3 from "@/utils/web3";
import config from "@/config.json";
import tokenFactoryAbi from "../abi/ERC20Factory.json";

const tokenFactory = new web3.eth.Contract(
  <any>tokenFactoryAbi.abi,
  config.contractAddress.tokenFactory.ganache,
);

export async function issueToken(token: {
  name: string;
  symbol: string;
  decimal: number;
  supply: number;
}) {
  await tokenFactory.methods
    .createERC20(token.supply, token.name, token.decimal, token.symbol)
    .send({ from: "0x2Ae0B52AfF2C39180236FE5ac1BD1982f2394eEf" });
}

export async function getTokens(){
    return await tokenFactory.methods.getTokens().call({from: "0x2Ae0B52AfF2C39180236FE5ac1BD1982f2394eEf"})
}
