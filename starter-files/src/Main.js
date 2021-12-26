import { React, useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT, upload2DDC, downloadFromDDC } from "./actions.js";

const Main = (props) => {

  //State variables
  const [status, setStatus] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [metadata, setMetadata] = useState("");
  const [cid, setCid] = useState(null);
  const [qty, setQty] = useState(null);
	const [uploadData, setUploadData] = useState("");
  const [uploadDataTitle, setUploadDataTitle] = useState("")
  const [uploadDataDescription, setUploadDataDescription] = useState("")
  // For ddc download
  const [content, setContent] = useState(null);

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

  const onUploadPressed = async () => {
    // TO DO
  }

  const onDownloadPressed = async () => {
    // TO DO
  }

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
      <h1 id="title"> Create an NFT with Cere Freeport and DDC </h1>
      <p id="status"> {status} </p>

      <br></br>
      <h2> Upload content to DDC </h2>
      <input type="text" placeholder="Enter content to upload to DDC. (e.g., a random string)" onChange={(event) => setUploadData(event.target.value)}/>
      &nbsp;
      <input type="text" placeholder="Give your content a title." onChange={(event) => setUploadDataTitle(event.target.value)}/>
      &nbsp;
      <input type="text" placeholder="Give your content a description." onChange={(event) => setUploadDataDescription(event.target.value)}/>
      <button id="actionButton" onClick={onUploadPressed}> Upload </button>      

      <br></br><br></br>
      &nbsp;
      <h2> Now download that content from DDC </h2>
      <input type="text" placeholder="Enter content ID returned from upload step." onChange={(event) => setCid(event.target.value)}/>
      <button id="actionButton" onClick={onDownloadPressed}> Download </button>      


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