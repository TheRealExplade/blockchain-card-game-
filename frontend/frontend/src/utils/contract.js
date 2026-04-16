import { ethers } from "ethers";

const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const MARKET_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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