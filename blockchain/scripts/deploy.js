async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  // Deploy NFT
  const CardNFT = await ethers.getContractFactory("CardNFT");
  const nft = await CardNFT.deploy();
  await nft.deployed();

  const nftAddress = nft.address;
  console.log("CardNFT deployed to:", nftAddress);

  // Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const market = await Marketplace.deploy(nftAddress);
  await market.deployed();

  const marketAddress = market.address;
  console.log("Marketplace deployed to:", marketAddress);


  const Trade = await ethers.getContractFactory("Trade");
  const trade = await Trade.deploy(nft.address);
  await trade.deployed();

  console.log("Trade deployed to:", trade.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});