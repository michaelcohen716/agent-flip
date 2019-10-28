import React, { useState, useEffect } from "react";
import SupportedAsset from "./SupportedAsset";
import AssetColumn from "./AssetColumn/AssetColumn";
import Transaction from "./Transaction/Transaction";
import detective from "../assets/detective.png";
import Welcome from "./Intro/Welcome";
import Instructions from "./Intro/Instructions";
import Web3 from "web3";
import "./Base.css";

function Holder({ children }) {
  return (
    <div className="position-relative">
      <div className="silver-bg-right position-absolute" />
      <div className="silver-bg-left position-absolute" />
      <div className="base mx-auto d-flex flex-column">{children}</div>
    </div>
  );
}

function Base() {
  const [inputAsset, setInputAsset] = useState("");
  const [outputAsset, setOutputAsset] = useState("");
  const [networkId, setNetworkId] = useState("")
  const [introState, setIntroState] = useState(0);
  const [force, setForce] = useState(false);

  const forceRerender = () => setForce(!force);

  let web3, netId;
  useEffect(() => {
  if(window.ethereum){
    web3 = new Web3(window.ethereum);
    netId = window.ethereum.networkVersion;
    setNetworkId(netId);
  }

  }, [networkId])

  if (introState === 0) {
    const injectedWeb3 = window.web3 ? true : false;
    return (
      <Holder>
        <Welcome setIntroState={setIntroState} injectedWeb3={injectedWeb3} />
      </Holder>
    )
  }

  if (introState === 1) {
    return (
      <Holder>
        <Instructions setIntroState={setIntroState} />
      </Holder>
    )
  }


  return (
    <Holder>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="supported-text">Supported assets</div>
          <SupportedAsset asset="BTC" supported={true} />
          <SupportedAsset asset="ETH" />
          <SupportedAsset asset="LINK" />
          {networkId !== 3 && (
            <div className="position-relative">
              <div className="position-absolute only-ropsten">
                * Agent Flip only deployed on Ropsten
              </div>
            </div>
          )}
        </div>
        <div className="d-flex mr-2">
          <img src={detective} className="img-fluid detective" />
          <div className="font-weight-bold agent-flip">Agent Flip</div>
        </div>
      </div>
      <div className="d-flex">
        <AssetColumn
          headline="Input"
          isInput={true}
          setAsset={setInputAsset}
          selectedAsset={inputAsset}
          force={force}
        />
        <Transaction inputAsset={inputAsset} outputAsset={outputAsset} forceRerender={forceRerender} />
        <AssetColumn
          headline="Output"
          isInactive={!inputAsset}
          setAsset={setOutputAsset}
          selectedInputAsset={inputAsset}
          selectedAsset={outputAsset}
        />
      </div>
    </Holder>

  );
}

export default Base;
