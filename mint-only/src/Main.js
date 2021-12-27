import { React, useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT} from "./actions.js";

const Main = (props) => {

  //State variables
  const [walletAddress, setWalletAddress] = useState("");
  const [metadata, setMetadata] = useState("");
  const [qty, setQty] = useState(null);
  const [status, setStatus] = useState("");

  function addWalletListener() {
    // TO DO
  };

  useEffect(async () => {
    // TO DO
  }, []);

  const connectWalletPressed = async () => {
    // TO DO
  };

  // Functions to fill out
  const onMintPressed = async () => {
    // TO DO
  };


  return (   
    <div className="Main">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " + String(walletAddress).substring(0, 6) + "..." + String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>
      <h1 id="title"> Mint an NFT with Cere Freeport </h1>
      <p id="status"> {status} </p>

      <br></br><br></br>
      &nbsp;
      <h2> Mint an NFT with Freeport </h2>
      <input type="text" placeholder="Enter some token metadata." onChange={(event) => setMetadata(event.target.value)}/>
      &nbsp;
      <input type="number" placeholder="Enter the number of copies to mint." value={qty} onChange={(event) => setQty(event.target.value)}/>
      <button id="actionButton" onClick={onMintPressed}> Mint NFT</button>      
    </div>
  );
};

export default Main;