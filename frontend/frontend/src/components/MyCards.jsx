import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getMarketContract, getNFTContract, MARKET_ADDRESS } from "../utils/contract";

function MyCards({ account }) {
  const [cards, setCards] = useState([]);

  // ✅ CORRECT: defined outside
  const loadCards = async () => {
    const nft = await getNFTContract();
    const ownedCards = [];

    const total = await nft.tokenCounter();

    for (let i = 0; i < total; i++) {
      try {
        const owner = await nft.ownerOf(i);

        if (owner.toLowerCase() === account.toLowerCase()) {
          const card = await nft.getCard(i);

          ownedCards.push({
            id: i,
            name: card.name,
            image: card.image,
            type: card.cardType,
            hp: card.hp.toString(),
            rarity: card.rarity
          });
        }
      } catch {}
    }

    setCards(ownedCards);
  };

  // ✅ clean useEffect
  useEffect(() => {
    if (account) loadCards();
  }, [account]);

  // ✅ move listCard INSIDE
  const listCard = async (tokenId) => {
    try {
      const market = await getMarketContract();
      const nft = await getNFTContract();

      const price = prompt("Enter price in ETH:");
      if (!price) return;

      const approveTx = await nft.approve(MARKET_ADDRESS, tokenId);
      await approveTx.wait();

      const tx = await market.listCard(
        tokenId,
        ethers.parseEther(price)
      );

      await tx.wait();

      alert("Card listed!");

      // 🔥 refresh
      await loadCards();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Cards</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {cards.map((card) => (
          <div key={card.id} style={{ border: "1px solid white", padding: "10px", width: "200px" }}>
            <img src={card.image} width="100%" />
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