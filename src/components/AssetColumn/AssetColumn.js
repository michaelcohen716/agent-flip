import React from "react";
import AssetItem from "./AssetItem";
import "./Column.css";

const ASSETS = [
  {
    name: "ETH",
    tooltipContent:
      "The reserve asset. Try converting ETH into a BTC position.",
    address: ""
  },
  {
    name: "WBTC",
    tooltipContent: "Collateralized long position. BitGo custodial WBTC.",
    address: "0x3dff0dce5fc4b367ec91d31de3837cf3840c8284" // ropsten
  },
  {
    name: "sBTC",
    tooltipContent: "Synthetic long position. Synthetix Synth sBTC.",
    address: "0xC1701AbD559FC263829CA3917d03045F95b5224A" // ropsten
  },
  {
    name: "cDai",
    tooltipContent: "Neutral, interest-earning position. Compound cDAI.",
    address: "0x2B536482a01E620eE111747F8334B395a42A555E" // ropsten
  },
  {
    name: "dsWBTC",
    tooltipContent: "Collateralized short position. bZx Perpetual 1x Short WBTC.",
    address: "0xdFb8e9bA49737Cd0E235975FF164298Fc625b762" // IWBTC ropsten [REPLACE WITH CORRECT]
  },
  {
    name: "iWBTC",
    tooltipContent: "Synthetic short position. Synthetix Synth iBTC.",
    address: "0xdFb8e9bA49737Cd0E235975FF164298Fc625b762" // ropsten
  }
];

function AssetColumn({
  headline,
  isInput,
  isInactive,
  setAsset,
  selectedAsset,
  selectedInputAsset
}) {
  return (
    <div className="d-flex flex-column asset-column mt-3 p-3">
      <h2 className="mx-auto asset-column-headline">{headline}</h2>
      <div className="mt-2 d-flex flex-column">
        {ASSETS.map((asset, i) => {
          const { name, tooltipContent, address } = asset;
      
          return (
            <AssetItem
              isInput={isInput}
              setAsset={setAsset}
              name={name}
              tooltipContent={tooltipContent}
              address={address}
              isInactive={isInactive || (!isInput && name === selectedInputAsset)}
              isSelected={name === selectedAsset}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AssetColumn;
