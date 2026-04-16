import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { getMarketContract, getNFTContract, MARKET_ADDRESS, getSigner } from "../utils/contract";
const listCard = async (tokenId) => {
  try {
    const nft = await getNFTContract();
    const market = await getMarketContract();

    const price = prompt("Enter price in ETH:");
    if (!price) return;

    // approve (only once)
    const approveTx = await nft.approve(MARKET_ADDRESS, tokenId);
    await approveTx.wait();

    // list
    const tx = await market.listCard(
      tokenId,
      ethers.parseEther(price)
    );

    await tx.wait();

    alert("Card listed!");
  } catch (err) {
    console.error(err);
  }
};



function MyCards({ account }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!account) return;

    const loadCards = async () => {
  const nft = await getNFTContract();
  const ownedCards = [];

  const total = await nft.tokenCounter();

  console.log("Total tokens:", total.toString());

  for (let i = 0; i < total; i++) {
    try {
      const owner = await nft.ownerOf(i);

      if (owner.toLowerCase() === account.toLowerCase()) {
        const card = await nft.getCard(i);

        console.log("FOUND CARD:", i, card);

        ownedCards.push({
          id: i,
          name: card.name,
          image: card.image,
          type: card.cardType,
          hp: card.hp.toString(),
          rarity: card.rarity
        });
      }
    } catch (err) {
      console.log("Error at token", i);
    }
  }

  setCards(ownedCards);
};

    loadCards();
  }, [account]);

  return (
    <div>
      <h2>My Cards</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: "1px solid white",
              padding: "10px",
              width: "200px"
            }}
          >
            <img src={card.image} alt="" width="100%" />
            <h3>{card.name}</h3>
            <p>Type: {card.type}</p>
            <p>HP: {card.hp}</p>
            <p>Rarity: {card.rarity}</p>
            <button onClick={() => listCard(card.id)}>
              List for Sale
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCards;