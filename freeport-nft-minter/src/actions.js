import { importProvider, getFreeportAddress, getContractAddress, createFreeport } from "@cere/freeport-sdk";
import { get as httpGet, post as httpPost } from "axios";

// Helper functions
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

// Connecting wallet 
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({method: "eth_requestAccounts"});
      return { status: "Follow the steps below.", address: addressArray[0] };
    } catch (err) {
      return { address: "", status: err.message};
    }
  } else {
      return { address: "", status: "Please install the metamask wallet" };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({ method: "eth_accounts" });
      if (addressArray.length > 0) {
        return { address: addressArray[0], status: "Follow the steps below." };
      } else {
        return { address: "", status: "Please connect to metamask." };
      }
    } catch (err) {
      return { address: "", status: err.message };
    }
  } else {
      return { address: "", status: "Please install the metamask wallet" };
  }
};

// Minting NFT
export const mintNFT = async (quantity, metadata) => {
  if (metadata.trim() == "" || (quantity < 1)) {
    return { success: false, status: "Make sure all fields are completed before minting." }
  }
  const provider = importProvider(); // e.g. "ethereum" object Metamask
  const env = "prod"; // or stage or dev. prod is default
  const contractAddress = await getFreeportAddress(provider, env); // Pick smart contract address based on the environment
  const apiInput = { provider, contractAddress }; // SDK object
  const cereFreeport = createFreeport(apiInput);
  try {
    const tx = await cereFreeport.issue(quantity, utilStr2ByteArr(metadata));
    return { success: true, status: "Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/" + tx.hash}
  } catch (error) {
    return { success: false, status: "Something went wrong: " + error.message }
  }
};

export const upload2DDC = async (data, title, description) => {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const minter = accounts[0]
    const minterEncryptionKey = await window.ethereum.request({ method: 'eth_getEncryptionPublicKey', params: [minter] });

    const provider = importProvider()
    const signer = provider.getSigner();
    await sleepX(1);
    const signature = await signer.signMessage(`Confirm asset upload\nTitle: ${title}\nDescription: ${description}\nAddress: ${minter}`); 

    let fdata = new FormData();
    fdata.append('minter', minter); 
    fdata.append('file', new File( utilStr2ByteArr(data), "my-ddc-file.txt", {type: "text/plain"})); 
    fdata.append('signature', signature); 
    fdata.append('minterEncryptionKey', minterEncryptionKey); 
    fdata.append('description', description); 
    fdata.append('title', title); 

    const httpPostResponse = await httpPost("https://ddc.freeport.dev.cere.network/assets/v1", fdata, { headers: {'Content-Type': 'multipart/form-data'} });
    const uploadId = httpPostResponse.data.id
    let contentId = null;
    var counter = 0;
    while (!contentId) {
      counter ++;
      let httpGetResponse = await httpGet(`https://ddc.freeport.dev.cere.network/assets/v1/${uploadId}`);
      contentId = httpGetResponse.data.result;
      if (contentId){
        return {contentId: contentId, status: `Uploaded. The content ID of your DDC upload is: ${contentId}`};
      }
      if (httpGetResponse.failed) {
        return { contentId: "", status: "DDC upload failed" };
      }
      if (counter == 2){
        return { contentId: "", status: "Unable to get upload status after 3 attempts" };
      }
      await sleepX(10);
    }
};

export const downloadFromDDC = async (contentId) => {
  const provider = importProvider();
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const minter = accounts[0];
  
  const signer = provider.getSigner();
  await sleepX(1);
  const signature = await signer.signMessage(`Confirm identity:\nMinter: ${minter}\nCID: ${contentId}\nAddress: ${minter}`); 
  const results = await httpGet(`https://ddc.freeport.dev.cere.network/assets/v1/${minter}/${contentId}/content`, { headers: { 'X-DDC-Signature': signature }});
  console.log(results);
  return results.data;
};