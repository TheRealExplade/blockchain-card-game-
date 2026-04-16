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

    const tokenIds = await market.getAllListings();

    const listedItems = [];

    for (let id of tokenIds) {
      try {
        const listing = await market.listings(id);
        const card = await nft.getCard(id);

        listedItems.push({
          id: id.toString(),
          price: ethers.formatEther(listing.price),
          name: card.name,
          image: card.image,
          type: card.cardType,
          hp: card.hp.toString(),
          rarity: card.rarity
        });
      } catch (err) {
        console.log("Error loading listing", id);
      }
    }

    setItems(listedItems);
  };

  const buyCard = async (id, price) => {
    try {
      const market = await getMarketContract();

      const tx = await market.buyCard(id, {
        value: ethers.parseEther(price)
      });

      await tx.wait();

      alert("Card bought!");
      loadListings();
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
            <p>Price: {item.price} ETH</p>

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