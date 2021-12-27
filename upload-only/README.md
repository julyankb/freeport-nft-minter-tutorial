# Uploading files to DDC
In this tutorial, you'll learn how to connect a React frontend that uploads content to the Cere DDC:

# Getting set up

## Installing dependencies and starting your project

First, clone this repo to your local environment. 

Then, we must install the Cere Freeport SDK along with some other dependencies in our project. In a terminal, navigate to this folder and run the following command:
    
    npm install ethers axios @cerefreeport-sdk

Once these have finished installing, run the following command in the `starter-files` directory
    
    npm start

If a browser does not open automatically, open one and navigate to [http://localhost:3000/](http://localhost:3000/). Here you'll see the frontend of your project. These are the functionalities that you will be implementing.

# The files you'll be working on

Open the following two files:


1. `src/actions.js`: this file contains the functions we need for interacting with our Metamask wallet, the Freeport smart contract and the DDC.
2. `src/Main.js`: this file contains the user inferface and the functions required to tie the two files together.

Let's break these down.  

## `1. actions.js`
### a. Imports
```javascript
import { importProvider, getFreeportAddress, createFreeport } from "@cere/freeport-sdk";
import { get as httpGet, post as httpPost } from "axios";
```
### b. Some helper functions
```javascript
const sleepX = async (x) => new Promise((resolve, _) => {
  setTimeout(() => resolve(), x*1000); 
});

export const utilStr2ByteArr = (str) => {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return arr;
}
```
### c. The functions you'll be completing
```javascript
export const connectWallet = async () => {
  // TO DO
};

export const getCurrentWalletConnected = async () => {
  // TO DO
};

export const upload2DDC = async (data, title, description) => {
  // TO DO
};

```
## `2. Main.js`

### a. Imports
```javascript
import { React, useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, upload2DDC } from "./actions.js";
```
### b. State variables
`useState` declares "state variables". Normally variables disappear when functions exit, but state variables are preserved. 
```javascript
const [status, setStatus] = useState("");
const [walletAddress, setWalletAddress] = useState("");
const [uploadData, setUploadData] = useState("");
const [uploadDataTitle, setUploadDataTitle] = useState("")
const [uploadDataDescription, setUploadDataDescription] = useState("")
```
### c. Another state variable: `status`
We'll update this variable with messages according to the outputs of the functions we call. This gives the user some feedback.  
```javascript
const [status, setStatus] = useState("");
```
### d. The functions you'll be completing
```javascript
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
```

### e. The user interface
Notice that the buttons and placeholders call our functions and update the state variables as the user interacts with them. 
```javascript
return (   
  <div className="Minter">
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
    <h2> Upload content to DDC: </h2>
    <input type="text" placeholder="Enter content to upload to DDC. (e.g., a random string)" onChange={(event) => setUploadData(event.target.value)}/>
    &nbsp;
    <input type="text" placeholder="Give your content a title." onChange={(event) => setUploadDataTitle(event.target.value)}/>
    &nbsp;
    <input type="text" placeholder="Give your content a description." onChange={(event) => setUploadDataDescription(event.target.value)}/>
    <button id="mintButton" onClick={onUploadPressed}> Upload </button>      
  </div>
);
```



# Connecting to your Metamask wallet

## `1. connectWallet [actions.js]`


```javascript
export const connectWallet = async () => {
  // Check if window.ethereum is enabled in your browser (i.e., metamask is installed)
  if (window.ethereum) {
    try {
      // Prompts a metamask popup in browser, where the user is asked to connect a wallet.
      const addressArray = await window.ethereum.request({method: "eth_requestAccounts"});
      // Return an object containing a "status" message and the user's wallet address.
      return { status: "Follow the steps below.", address: addressArray[0] };
    } catch (err) {
        return { address: "", status: err.message };
    }
    // Metamask injects a global API into websites visited by its users at 'window.ethereum'.
    // If window.ethereum is not enabled, then metamask must not be installed. 
  } else { 
      return {address: "", status: "Please install the metamask wallet"};
  }
};
```

## `2. getCurrentWalletConnected [actions.js]`
```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      // Get the array of wallet addresses connected to metamask
      const addressArray = await window.ethereum.request({ method: "eth_accounts" });
      // If it contains at least one wallet address
      if (addressArray.length > 0) {
        return { address: addressArray[0], status: "Follow the steps below." };
      // If this list is empty, then metamask must not be connected.
      } else {
        return { address: "", status: "Please connect to metamask." };
      }
      // Catch any errors here and return them to the user through the 'status' state variable.
    } catch (err) {
      return { address: "", status: err.message };
    }
    // Again, if window.ethereum is not enabled, then metamask must not be installed.
  } else {
      return { address: "", status: "Please install the metamask wallet" };
  }
};
```

## `3. addWalletListner [actions.js]`
Update the UI when wallet state changes, e.g. when user adds an account, switching between accounts, or disconnects their account. 
```javascript
function addWalletListener() {
  // Again, check if metamask is installed and if it is,
  if (window.ethereum) { 
      // Here, we listen for state changes in the metamask wallet such as
      window.ethereum.on("accountsChanged", (accounts) => {
        // If there is at least one account, update the state variables 'walletAddress' and 'status'
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("Follow the steps below.");
        // If metamask is installed but there are no accounts, then it must not be connected.
        } else {
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    // If metamask is not installed, then ask them to install it. 
  } else {
      setStatus("Please install metamask and come back");
  }
};
```


## ` 4. connectWalletPressed [Main.js]`
```javascript
const connectWalletPressed = async () => {
  // Call our connectWallet function from the previous step and await response.
  const walletResponse = await connectWallet();
  // Recall that 'connectWallet' returns an object with two elements: address and status.
  // Update the 'status' and 'walletAddress' state variables with this new information. 
  setStatus(walletResponse.status);
  setWalletAddress(walletResponse.address);
};
```


## ` 5. useEffect [Main.js]` 
`useEffect()` is a React hook that is called after the component is rendered. It accepts 2 arguments: `callback` the function containing the side-effect logic that executes right after changes are pushed to DOM, and `dependencies`, which control when you want this logic to run. The `useEffect()` executes `callback` only if `dependencies` have changed between renderings. We leave the `dependencies` array empty to execute this logic on the first render only. Because it's empty, the condition to re-execute the `callback` logic will never be met again. 

```javascript
useEffect(async () => {
  // The 'callback' side-effect logic
  const {address, status} = await getCurrentWalletConnected();
  setWalletAddress(address)
  setStatus(status); 
  addWalletListener();
  // The 'dependencies' array
}, []);
```




# Uploading your asset to DDC

## `1. upload2DDC [actions.js]`
This is where we start using Cere Freeport. 
```javascript
export const upload2DDC = async (data, title, description) => {
    // Get the wallets that are connected to metamask
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    // Get the user's wallet address
    const minter = accounts[0]
    // Here we request that the user shares their public encryption key.
    const minterEncryptionKey = await window.ethereum.request({method: 'eth_getEncryptionPublicKey', params: [minter]});
    // Create a new provider, which is an abstraction of a connection to the Ethereum network
    const provider = importProvider()
    // Get the user's account. A 'signer' is an abstraction of an Ethereum account.
    const signer = provider.getSigner();
    // Wait one second.
    await sleepX(1);
    // Create the signature 
    const signature = await signer.signMessage(`Confirm asset upload\nTitle: ${title}\nDescription: ${description}\nAddress: ${minter}`); 


    // Construct a set of key/value pairs representing the fields required by the Cere DDC API. 
    let fdata = new FormData();
    fdata.append('minter', minter); 
    fdata.append('file', new File( utilStr2ByteArr(data), "my-ddc-file.txt", {type: "text/plain"})); 
    fdata.append('signature', signature); 
    fdata.append('minterEncryptionKey', minterEncryptionKey); 
    fdata.append('description', description); 
    fdata.append('title', title); 

    // Make an HTTP post request to the Cere DDC API using the FormData object we defined above.
    const httpPostResponse = await httpPost("https://ddc.freeport.dev.cere.network/assets/v1", fdata, { headers: {'Content-Type': 'multipart/form-data'} });
    // This post request contains a string corresponding to the uploadId of your upload request
    const uploadId = httpPostResponse.data.id

    // With this uploadId, we make a get request to the Cere DDC API to get the contentId of our upload. 
    // This content will not exist until the upload is complete.
    // We repeat this request until the file is uploaded or the upload fails (max 3 attempts)
    let contentId = null;
    var counter = 0;
    while (!contentId) {
      counter ++;
      let httpGetResponse = await httpGet(`https://ddc.freeport.dev.cere.network/assets/v1/${uploadId}`);
      contentId = httpGetResponse.data.result;
      // If the contentId is no longer null, 
      if (contentId){
        // Exit the function call and return the contentId and an informative 'status'.
        return {contentId: contentId, status: `Uploaded. The content ID of your DDC upload is: ${contentId}`};
      }
      if (httpGetResponse.failed) {
        return { contentId: "", status: "DDC upload failed" };
      }
      if (counter == 2){
        return { contentId: "", status: "Unable to get upload status after 3 attempts" };
      }
      // Wait 10 seconds before trying again.
      await sleepX(10);
    }
};
```

## `2. onUploadPressed [Main.js]`
This function simply calls the upload2DDC function and sets the state variable `status` with the status returned.
```javascript
const onUploadPressed = async () => {
  const { contentId, status } = await upload2DDC(uploadData, uploadDataTitle, uploadDataDescription);
  setStatus(status);
}
```
