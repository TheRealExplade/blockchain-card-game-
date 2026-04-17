import { useEffect, useState } from "react";
import { getMarketContract, getNFTContract } from "../utils/contract";
import { ethers } from "ethers";

function Marketplace() {
  const [items, setItems] = useState([]);

  useEffect(() => {
  loadListings();
}, []);

  const loadListings = async () => {
  const market = await getMarketContract();
  const nft = await getNFTContract();

  const ids = await market.getAllListings();

  const items = [];

  for (let id of ids) {
    const listing = await market.listings(id);

    if (!listing.price || listing.price.toString() === "0") continue;

    const card = await nft.getCard(id);

    items.push({
      id,
      price: listing.price,
      seller: listing.seller,
      name: card.name,
      image: card.image,
      type: card.cardType,
      hp: card.hp.toString(),
      rarity: card.rarity
    });
  }

  setItems(items);
};

  const buyCard = async (id, price) => {
  try {
    const market = await getMarketContract();

    const tx = await market.buyCard(id, {
      value: price
    });

    await tx.wait();

    alert("Card bought!");

    // 🔥 REFRESH
    await loadListings();

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <h2>Marketplace</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: "1px solid white", padding: "10px", width: "200px" }}>
            <img src={item.image} width="100%" />
            <h3>{item.name}</h3>
            <p>HP: {item.hp}</p>
            <p>Price: {ethers.formatEther(item.price)} ETH</p>

            <button onClick={() => buyCard(item.id, item.price)}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;