import React from "react";
import SupportedAsset from "./SupportedAsset";
import AssetColumn from "./AssetColumn/AssetColumn";
import Transaction from "./Transaction/Transaction"
import "./Base.css";

function Base() {
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
          <div className="font-weight-bold">Agent Flip</div>
        </div>
        <div className="d-flex">
          <AssetColumn headline="Input" />
          <Transaction />
          <AssetColumn headline="Output" />
        </div>
      </div>
    </div>
  );
}

export default Base;
