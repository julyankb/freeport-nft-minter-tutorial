import { importProvider, getFreeportAddress, getContractAddress, createFreeport } from "@cere/freeport-sdk";
import { get as httpGet, post as httpPost } from "axios";

// Helper function
export const utilStr2ByteArr = (str) => {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return arr;
}

// Connecting wallet 
export const connectWallet = async () => {
  // TO DO 
};

export const getCurrentWalletConnected = async () => {
  // TO DO
};

// Minting NFT
export const mintNFT = async (quantity, metadata) => {
  // TO DO
};
