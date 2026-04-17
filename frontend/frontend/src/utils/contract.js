import { ethers } from "ethers";

const NFT_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
export const MARKET_ADDRESS = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";
export const TRADE_ADDRESS = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

const NFT_ABI = [
  "function mintCard(address to,string name,string image,string cardType,uint256 hp,string rarity)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function getCard(uint256 tokenId) view returns (tuple(string name,string image,string cardType,uint256 hp,string rarity))",
  "function tokenCounter() view returns (uint256)",
  "function approve(address to, uint256 tokenId)",
  "function getAllListings() view returns (uint256[])",
  "function listings(uint256) view returns (address seller, uint256 price)"
];

const MARKET_ABI = [
  "function listCard(uint256 tokenId,uint256 price)",
  "function buyCard(uint256 tokenId) payable",
  "function getAllListings() view returns (uint256[])",
  "function listings(uint256) view returns (address seller, uint256 price)"
];

const TRADE_ABI = [
  "function createTrade(address to,uint256 offeredToken,uint256 requestedToken)",
  "function acceptTrade(uint256 tradeId)",
  "function getTrades() view returns (tuple(address from,address to,uint256 offeredToken,uint256 requestedToken,bool active)[])"
];

export const getTradeContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(TRADE_ADDRESS, TRADE_ABI, signer);
};

// ✅ Ethers v6 way
export const getProvider = () => {
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  return await provider.getSigner();
};

export const getNFTContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
};

export const getMarketContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, signer);
};

