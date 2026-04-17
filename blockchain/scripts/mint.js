const { ethers } = require("hardhat");

async function main() {
  const [deployer, user2] = await ethers.getSigners();

  console.log("Admin (deployer):", deployer.address);
  console.log("User2:", user2.address);

  const nftAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

  const nft = await ethers.getContractAt("CardNFT", nftAddress);

  // 🔥 Mint TWO cards to admin
  await (await nft.mintCard(
    deployer.address,
    "Fire Dragon",
    "https://picsum.photos/200",
    "Fire",
    100,
    "Legendary"
  )).wait();

  await (await nft.mintCard(
    deployer.address,
    "Ice Phoenix",
    "https://picsum.photos/201",
    "Ice",
    95,
    "Epic"
  )).wait();

  console.log("🔥 2 cards minted to admin");
}

main().catch(console.error);