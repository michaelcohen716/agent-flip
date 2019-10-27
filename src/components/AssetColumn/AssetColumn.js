import React from "react";
import AssetItem from "./AssetItem";
import { ASSETS } from "../../utils/assets";
import "./Column.css";

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
              isInactive={
                isInactive || (!isInput && name === selectedInputAsset)
              }
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
