import React from "react";
import AssetItem from "./AssetItem";
import "./Column.css";

const ASSETS = [
  {
    name: "ETH",
    tooltipContent: "The reserve asset. Try converting ETH into a BTC position."
  },
  {
    name: "WBTC",
    tooltipContent: "Collateralized long position. BitGo custodial WBTC."
  },
  {
    name: "sBTC",
    tooltipContent: "Synthetic long position. Synthetix Synth sBTC."
  },
  {
    name: "cDai",
    tooltipContent: "Neutral, interest-earning position. Compound cDAI."
  },
  {
    name: "dsWBTC",
    tooltipContent: "Collateralized short position. bZx Perpetual Short WBTC."
  },
  {
    name: "iWBTC",
    tooltipContent: "Synthetic short position. Synthetix Synth iBTC."
  }
];

function AssetColumn({ headline }) {
  return (
    <div className="d-flex flex-column asset-column mt-3 p-3">
      <h2 className="mx-auto">{headline}</h2>
      <div className="mt-2 d-flex flex-column">
        {ASSETS.map((asset, i) => {
          const { name, tooltipContent } = asset;
          return (
            <AssetItem name={name} tooltipContent={tooltipContent} key={i} />
          );
        })}
      </div>
    </div>
  );
}

export default AssetColumn;
