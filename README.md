# 🃏 Blockchain Card Game

A decentralized card trading + marketplace + trading system built using:

* **Solidity (Hardhat)**
* **React (Vite)**
* **Ethers.js**
* **MetaMask**

---

# 🚀 Features

* Mint NFT cards
* View owned cards
* List cards on marketplace
* Buy cards from other users
* Trade cards between users (P2P)

---

# 📁 Project Structure

```
blockchain-card-game/
│
├── blockchain/        # Smart contracts + Hardhat
│   ├── contracts/
│   ├── scripts/
│   └── hardhat.config.js
│
├── frontend/          # React frontend (Vite)
│   └── src/
│
└── README.md
```

---

# ⚙️ Prerequisites

Make sure you have:

* Node.js (v18+ recommended)
* MetaMask installed in browser
* Git

---

# 🧠 IMPORTANT CONCEPT

This project runs on a **local blockchain (Hardhat)**.

So every time you restart:
👉 contracts reset
👉 accounts reset
👉 you must redeploy + mint again

---

# 🧪 STEP-BY-STEP SETUP (FROM SCRATCH)

---

## 🟢 1. Start Blockchain (Terminal 1)

```bash
cd blockchain
npx hardhat node
```

This starts local blockchain at:

```
http://127.0.0.1:8545
```

⚠️ Keep this terminal running ALWAYS

---

## 🟢 2. Deploy Contracts (Terminal 2)

Open new terminal:

```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```

You’ll see:

```
CardNFT deployed to: 0x...
Marketplace deployed to: 0x...
Trade deployed to: 0x...
```

👉 COPY THESE ADDRESSES

---

## 🟢 3. Update Frontend Contract Addresses

Go to:

```
frontend/src/utils/contract.js
```

Update:

```js
export const NFT_ADDRESS = "PASTE_HERE";
export const MARKET_ADDRESS = "PASTE_HERE";
export const TRADE_ADDRESS = "PASTE_HERE";
```

---

## 🟢 4. Add Hardhat Account to MetaMask

From Terminal 1 (node), copy a private key:

```
Account #0
Private Key: 0xabc...
```

### In MetaMask:

* Import Account → paste private key
* Switch network → **Hardhat Local**

---

## 🟢 5. Run Frontend (Terminal 3)

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🎴 MINTING CARDS

Run:

```bash
cd blockchain
npx hardhat run scripts/mint.js --network localhost
```

👉 This mints cards to predefined accounts

---

# 👥 TESTING MULTIPLE USERS

You can simulate multiple players:

### Method 1 (Recommended)

* Import multiple Hardhat accounts into MetaMask
* Switch between them

### Method 2

* Open multiple browser tabs
* Each tab uses different MetaMask account

---

# 🛒 MARKETPLACE FLOW

1. Connect wallet
2. View "My Cards"
3. Click **List for Sale**
4. Switch account
5. Buy from Marketplace

---

# 🔄 TRADE FLOW

### Player A:

* Enter Player B address
* Select card to offer
* Select card to request
* Click **Create Trade**

### Player B:

* See trade
* Accept OR Decline

### Player A:

* Can Cancel trade

---

# ⚠️ COMMON ISSUES (IMPORTANT)

---

## ❌ "contract function is not a function"

👉 You forgot to:

* redeploy contracts
* update ABI
* update contract address

---

## ❌ Cards not showing

👉 Check:

* correct MetaMask account
* correct contract address
* blockchain restarted (data reset)

---

## ❌ Transactions failing

👉 Usually means:

* NFT not approved
* wrong owner
* wrong tokenId

---

## ❌ After restart nothing works

👉 You MUST redo:

```bash
1. npx hardhat node
2. deploy.js
3. update contract.js
4. mint.js
```

---

# 🧠 DEVELOPMENT WORKFLOW

Whenever you change smart contracts:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

👉 Then update frontend address again

---

# 🧪 QUICK RESET (FULL CLEAN START)

If things break:

```bash
# Terminal 1
npx hardhat node

# Terminal 2
npx hardhat run scripts/deploy.js --network localhost

# Terminal 2
npx hardhat run scripts/mint.js --network localhost

# Terminal 3
npm run dev
```

---

# 🎮 NEXT IDEAS

* Battle system (3v3 cards)
* Card stats & abilities
* Player matchmaking
* Better UI (card selection instead of dropdowns)

---

# 👨‍💻 Author Notes

This project uses:

* Local blockchain → fast testing
* No backend needed → fully decentralized logic
* Frontend handles UI + interactions

---

# 💀 FINAL TIP

If something breaks:

```text
It is ALWAYS one of:
- wrong contract address
- forgot to redeploy
- wrong MetaMask account
```

---

Enjoy building 🚀
