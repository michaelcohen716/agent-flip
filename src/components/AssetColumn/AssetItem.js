import React, { useEffect } from "react";
import TooltipLite from 'react-tooltip-lite';
import "./Column.css";

function AssetItem({ name, tooltipContent }) {
//   useEffect(() => {
//     const getBalance = async() => {
//         // IMPLEMENT
//     }
//   })  

  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex asset-item p-2 justify-content-between">
        <div className="asset-name">{name}</div>
        <TooltipLite multiline={true} content={tooltipContent}>
        {/* <TooltipLite multiline={true} content="The reserve asset. Try converting ETH into a BTC position."> */}
            <div className="tooltip-holder">?</div>
        </TooltipLite>
      </div>
      <div className="mt-1 d-flex">
        <div className="balance-title">Balance: </div>
        <div className="balance-val ml-1">0.0001</div>
      </div>
    </div>
  );
}

export default AssetItem;
