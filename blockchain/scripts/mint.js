async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Minting with:", deployer.address);

  const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const CardNFT = await ethers.getContractFactory("CardNFT");
  const nft = await CardNFT.attach(nftAddress);

  const tx = await nft.mintCard(
    deployer.address,
    "Fire Dragon",
    "https://picsum.photos/200", // random image for now
    "Fire",
    100,
    "Legendary"
  );

  await tx.wait();

  console.log("🔥 Card minted!");
}

main().catch(console.error);