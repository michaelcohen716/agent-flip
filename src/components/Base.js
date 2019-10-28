import React, { useState } from "react";
import SupportedAsset from "./SupportedAsset";
import AssetColumn from "./AssetColumn/AssetColumn";
import Transaction from "./Transaction/Transaction";
import detective from "../assets/detective.png";
import "./Base.css";

function Base() {
  const [inputAsset, setInputAsset] = useState("");
  const [outputAsset, setOutputAsset] = useState("");

  return (
    <div className="position-relative">
      <div className="silver-bg-right position-absolute" />
      <div className="silver-bg-left position-absolute" />
      <div className="base mx-auto d-flex flex-column">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="supported-text">Supported assets</div>
            <SupportedAsset asset="BTC" supported={true} />
            <SupportedAsset asset="ETH" />
            <SupportedAsset asset="LINK" />
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
          />
          <Transaction inputAsset={inputAsset} outputAsset={outputAsset} />
          <AssetColumn
            headline="Output"
            isInactive={!inputAsset}
            setAsset={setOutputAsset}
            selectedInputAsset={inputAsset}
            selectedAsset={outputAsset}
          />
        </div>
      </div>
    </div>
  );
}

export default Base;
