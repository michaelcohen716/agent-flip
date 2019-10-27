import React, { useEffect, useState } from "react";
import TooltipLite from "react-tooltip-lite";
import getWeb3 from "../../getWeb3";
import { ERC20Contract } from "../../services/uniswap";
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
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const web3 = await getWeb3();
      const addr = web3.eth.accounts.givenProvider.selectedAddress;
      let bal;

      if (name === "ETH") {
        bal = await web3.eth.getBalance(addr);
      } else {
        const erc20 = await ERC20Contract(address);

        bal = await erc20.methods.balanceOf(addr).call();
      }

      bal = name === "WBTC" ? (bal / 10 ** 8).toFixed(4) : (bal / 10 ** 18).toFixed(4);
      setBalance(bal);
    };
    getBalance();
  });

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
