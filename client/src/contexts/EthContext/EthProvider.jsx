import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import WalletConnectProvdier from "@walletconnect/web3-provider";
import { infuraProvider } from 'wagmi/providers/infura'
import { Web3Button } from "@web3modal/react";

// import {
//   EthereumClient,
//   modalConnectors,
//   walletConnectProvider,
// } from "@web3modal/ethereum";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from "@web3modal/ethereum";


import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi";


// import '@tensorflow/tfjs-node';

  
var newjson=[]

export  function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const chains =[goerli];

const {provider} = configureChains(chains,[ w3mProvider({ projectId: "251542da3c8552393e55d6d3b636127e" })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: "251542da3c8552393e55d6d3b636127e",
    version: "1", // or "2"
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient,chains);

//  const provider3 = new WalletConnectProvdier({
  
//   rpc: {
//     5:'https://goerli.infura.io/v3/ff2d998f9cdf4be29197ce3ffb727d89'
    
//   },
//   infuraId: "ff2d998f9cdf4be29197ce3ffb727d89",
  
 
//  qrcodeModalOptions: {
//    desktopLinks: [
//      'ledger',
//      'tokenary',
//      'wallet',
//      'wallet 3',
//      'secuX',
//      'ambire',
//      'wallet3',
//      'apolloX',
//      'zerion',
//      'sequence',
//      'punkWallet',
//      'kryptoGO',
//      'nft',
//      'riceWallet',
//      'vision',
//      'keyring'
//    ],
//    mobileLinks: [
//      "rainbow",
//      "metamask",
//      "argent",
//      "trust",
//      "imtoken",
//      "pillar",
     
//    ],}});



  const init = useCallback(
    async artifact => {
      
      if (artifact) {   
        // const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");
            
  // await provider.disconnect();            
  // await provider3.enable();
  
  //  const web3 = new Web3(provider);
  
  const web3 = new Web3(window.web3.currentProvider);
  await window.web3.currentProvider.enable();


 
        
        const accounts = await web3.eth.getAccounts();
        const networkID = await web3.eth.net.getId();
       
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);   
          
        } catch (err) {
          console.error(err);
          console.log("에러위치");
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract,newjson,provider}
        });
      }
    }, []);

  

    
   
  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/ArtGrowNFT.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);

    };
    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init,state.artifact]);

  
 
  

  return (
    
     <React.Fragment>
       <EthContext.Provider value={{
      state,
      dispatch
    }}>
      
      {children}
     
  
    </EthContext.Provider>
    
     </React.Fragment>


  );
}


export default EthProvider;

