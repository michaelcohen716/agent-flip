import React from "react";
import "./Base.css";

function SupportedAsset({ asset, supported = false }) {
  return (
    <div
      className={`asset ${
        supported ? "supported-asset" : "unsupported-asset"
      } ml-2`}
    >
      <div className="supported-asset-text">{asset}</div>
    </div>
  );
}

export default SupportedAsset;
