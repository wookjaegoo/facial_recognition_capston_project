import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

import { w3mProvider } from "@web3modal/ethereum";
import { configureChains } from "wagmi";

import { sepolia } from "wagmi/chains";

var newjson = [];

export function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const chains = [sepolia];

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId: "ad51cb658b57c4bb5916b92e7f4a4ff7" }),
  ]);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(window.web3.currentProvider);
      await window.web3.currentProvider.enable();

      const accounts = await web3.eth.getAccounts();
      const networkID = await web3.eth.net.getId();

      const { abi } = artifact;
      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        web3.utils.toChecksumAddress(address);

        contract = new web3.eth.Contract(abi, address);
        console.log(contract);
      } catch (err) {
        console.error(err);
        console.log("에러위치");
      }
      dispatch({
        type: actions.init,
        data: {
          artifact,
          web3,
          accounts,
          networkID,
          contract,
          newjson,
          publicClient,
        },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/RedNotice.json");
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
    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <React.Fragment>
      <EthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </EthContext.Provider>
    </React.Fragment>
  );
}

export default EthProvider;
