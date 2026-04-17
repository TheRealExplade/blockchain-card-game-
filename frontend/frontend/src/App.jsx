import { useState } from "react";
import { getSigner } from "./utils/contract";
import MyCards from "./components/MyCards";
import Marketplace from "./components/Marketplace";
import Trade from "./components/Trade";
function App() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    const signer = await getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  return (
    <div>
      <h1>Blockchain Card Game</h1>

      {account ? (
        <>
          <p>Connected: {account}</p>
          <MyCards account={account} />
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      <Marketplace />
      <Trade account={account} />
    </div>
  );
}

export default App;