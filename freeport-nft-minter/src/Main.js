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
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setStatus("Follow the steps below.");
          } else {
            setStatus("Connect to Metamask using the top right button.");
          }
        });
    } else {
        setStatus("Please install metamask and come back");
    }
  };

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWalletAddress(address)
    setStatus(status); 
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };

  // Functions to fill out
  const onMintPressed = async () => {
    const { status } = await mintNFT(+qty, metadata)
    setStatus(status);
  };

  const onUploadPressed = async () => {
    const { contentId, status } = await upload2DDC(uploadData, uploadDataTitle, uploadDataDescription);
    setStatus(status);
}

  const onDownloadPressed = async () => {
    const content = await downloadFromDDC(cid);
    setContent(content);
    setStatus(`Downloaded. Here's your content: ${content}`);
}

  return (   
    <div className="Main">
      <br></br>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " + String(walletAddress).substring(0, 6) + "..." + String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>
      <h1 id="title"> Create an NFT with Cere Freeport and DDC </h1>

      <div class="header">
        <h3>Status message:</h3>
      <p id="status"> {status} </p>
      </div>

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
