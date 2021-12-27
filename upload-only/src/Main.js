import { React, useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, upload2DDC} from "./actions.js";

const Main = (props) => {

  //State variables
  const [status, setStatus] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
	const [uploadData, setUploadData] = useState("");
  const [uploadDataTitle, setUploadDataTitle] = useState("")
  const [uploadDataDescription, setUploadDataDescription] = useState("")

  function addWalletListener() {
    // TO DO
  };

  useEffect(async () => {
    // TO DO
  }, []);

  const connectWalletPressed = async () => {
    // TO DO
  };

  const onUploadPressed = async () => {
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
      <h1 id="title"> Upload data to DDC </h1>
      <p id="status"> {status} </p>

      <br></br>
      <h2> Upload content to DDC </h2>
      <input type="text" placeholder="Enter content to upload to DDC. (e.g., a random string)" onChange={(event) => setUploadData(event.target.value)}/>
      &nbsp;
      <input type="text" placeholder="Give your content a title." onChange={(event) => setUploadDataTitle(event.target.value)}/>
      &nbsp;
      <input type="text" placeholder="Give your content a description." onChange={(event) => setUploadDataDescription(event.target.value)}/>
      <button id="actionButton" onClick={onUploadPressed}> Upload </button>      

    </div>
  );
};

export default Main;