import React, { useEffect, useState } from "react";
import TooltipLite from "react-tooltip-lite";
import { getTokenBalance, web3 } from "../../services/erc20";
import useGetBalance from "../../hooks/useGetBalance";
import "./Column.css";

function AssetItem({
  isInput,
  name,
  tooltipContent,
  address,
  isSelected,
  isInactive,
  setAsset
}) {
  const { balance } = useGetBalance(address, name);

  const getItemClass = () => {
    if (isSelected) {
      return "asset-item-selected";
    } else if (isInactive) {
      return "asset-item-inactive";
    } else {
      return "asset-item-active";
    }
  };

  const setItem = () => {
    if(!isInactive){
      setAsset(name)
    }
  }

  return (
    <div className="d-flex flex-column mb-2">
      <div
        className={`d-flex asset-item ${getItemClass()} p-2 justify-content-between`}
        onClick={setItem}
      >
        <div className="asset-name">{name}</div>
        <TooltipLite multiline={true} content={tooltipContent}>
          <div className="tooltip-holder">?</div>
        </TooltipLite>
      </div>
      <div className="mt-1 d-flex balance-section">
        {isInput && (
          <React.Fragment>
            <div className="balance-title">Balance: </div>
            <div className="balance-val ml-1">{balance}</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default AssetItem;
