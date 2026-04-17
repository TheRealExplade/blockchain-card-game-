import { useEffect, useState } from "react";
import { getNFTContract, getTradeContract, TRADE_ADDRESS } from "../utils/contract";

function Trade({ account }) {
  const [trades, setTrades] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [to, setTo] = useState("");
  const [offered, setOffered] = useState("");
  const [requested, setRequested] = useState("");
  const [otherCards, setOtherCards] = useState([]);

  // 🔥 load my cards
  const loadMyCards = async () => {
    const nft = await getNFTContract();
    const total = await nft.tokenCounter();

    const owned = [];

    for (let i = 0; i < total; i++) {
      try {
        const owner = await nft.ownerOf(i);

        if (owner.toLowerCase() === account.toLowerCase()) {
          owned.push(i);
        }
      } catch {}
    }

    setMyCards(owned);
  };

  // 🔥 load trades
  const loadTrades = async () => {
    const trade = await getTradeContract();
    const all = await trade.getTrades();

    setTrades(all);
  };

  useEffect(() => {
    if (account) {
      loadMyCards();
      loadTrades();
    }
  }, [account]);

  // 🔥 create trade
  const createTrade = async () => {
    try {
      const nft = await getNFTContract();
      const trade = await getTradeContract();

      if (!to || offered === "" || requested === "") {
        alert("Fill all fields");
        return;
      }

      // approve
      const approveTx = await nft.approve(TRADE_ADDRESS, offered);
      await approveTx.wait();

      const tx = await trade.createTrade(to, offered, requested);
      await tx.wait();

      alert("Trade created!");

      loadTrades();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 accept trade
  const acceptTrade = async (id, requestedToken) => {
    try {
      const nft = await getNFTContract();
      const trade = await getTradeContract();

      // 🔥 APPROVE FIRST (THIS WAS MISSING)
      const approveTx = await nft.approve(TRADE_ADDRESS, requestedToken);
      await approveTx.wait();

      const tx = await trade.acceptTrade(id);
      await tx.wait();

      alert("Trade completed!");

      loadTrades();
      loadMyCards();
    } catch (err) {
      console.error(err);
    }
};

const cancelTrade = async (id) => {
  const trade = await getTradeContract();

  const tx = await trade.cancelTrade(id);
  await tx.wait();

  alert("Trade cancelled!");

  loadTrades();
};

const declineTrade = async (id) => {
  try {
    const trade = await getTradeContract();

    const tx = await trade.declineTrade(id);
    await tx.wait();

    alert("Trade declined!");

    loadTrades();
  } catch (err) {
    console.error(err);
  }
};

const loadOtherCards = async (address) => {
  const nft = await getNFTContract();
  const total = await nft.tokenCounter();

  const cards = [];

  for (let i = 0; i < total; i++) {
    try {
      const owner = await nft.ownerOf(i);

      if (owner.toLowerCase() === address.toLowerCase()) {
        cards.push(i);
      }
    } catch {}
  }

  setOtherCards(cards);

};

useEffect(() => {
      if (to) loadOtherCards(to);
    }, [to]);

  return (
    <div>
      <h2>Trade Cards</h2>

      {/* 🔥 CREATE TRADE UI */}
      <div style={{ border: "1px solid white", padding: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Recipient address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <br />

        <label>Offer:</label>
        <select
          value={offered}
          onChange={(e) => setOffered(Number(e.target.value))}
        >
          <option value="">Select your card</option>
          {myCards.map((id) => (
            <option key={id} value={id}>
              Token #{id}
            </option>
          ))}
        </select>

        <br />

        <label>Request:</label>
        <select onChange={(e) => setRequested(Number(e.target.value))}>
          <option value="">Select their card</option>

          {otherCards.map((id) => (
            <option key={id} value={id}>
              Token #{id}
            </option>
          ))}
        </select>

        <br />

        <button onClick={createTrade}>Create Trade</button>
      </div>

      {/* 🔥 TRADES LIST */}
      <h3>Active Trades</h3>

      {trades.map((t, i) =>
        t.active ? (
          <div key={i} style={{ border: "1px solid white", padding: "10px", marginBottom: "10px" }}>
            <p>From: {t.from}</p>
            <p>To: {t.to}</p>
            <p>Offer: {t.offeredToken} ↔ {t.requestedToken}</p>

            {t.to &&
              account &&
              t.to.toLowerCase() === account.toLowerCase() && (
                <>
                  <button onClick={() => acceptTrade(i, t.requestedToken)}>
                    Accept Trade
                  </button>

                  <button onClick={() => declineTrade(i)}>
                    Decline Trade
                  </button>
                </>
            )}

            {t.from && t.from.toLowerCase() === account.toLowerCase() && (
              <button onClick={() => cancelTrade(i)}>
                Cancel Trade
              </button>
              )}
          </div>
        ) : null
      )}
    </div>
  );
}

export default Trade;