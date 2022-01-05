import { importProvider, getFreeportAddress, createFreeport, getNFTAttachmentAddress, createNFTAttachment } from "@cere/freeport-sdk";
import { get as httpGet, post as httpPost } from "axios";
import bs58 from 'bs58';


export const connectWallet = async () => {
  // TO DO 
};

export const getCurrentWalletConnected = async () => {
  // TO DO 
};

export const upload2DDC = async (data, title, description) => {
  // TO DO 
};

export const downloadFromDDC = async (contentId) => {
  // TO DO 
};

export const mintNFT = async (quantity, metadata) => {
  // TO DO 
};

export const attachNftToCid = async (nftId, cid) => {
  // TO DO 
};

// Helper functions
const sleepFor = async (x) => new Promise((resolve, _) => {
  setTimeout(() => resolve(), x*1000); 
});

export const utilStr2ByteArr = (str) => {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    return arr;
}