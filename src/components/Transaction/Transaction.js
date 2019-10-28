import React, { useState, useEffect } from "react";
import ApproveNotice from "./ApproveNotice";
import {
  ethToWbtc,
  wbtcToEth,
  approveERC20,
  ethToSbtc,
  ethToIbtc,
  wbtcToSbtc,
  wbtcToIbtc,
  sbtcToEth,
  sbtcToWbtc,
  sbtcToIbtc
} from "../../services/flipContract";
import { getTokenAllowance, setTokenAllowance } from "../../services/erc20";
import { assetToAddress } from "../../utils/assets";
import useGetBalance from "../../hooks/useGetBalance";
import "./Transaction.css";

const functionMap = {
  ETH: {
    WBTC: ethToWbtc,
    sBTC: ethToSbtc,
    cDai: null,
    dsWBTC: null,
    iBTC: ethToIbtc
  },
  WBTC: {
    // approve needs to run first
    ETH: wbtcToEth, 
    sBTC: wbtcToSbtc,
    cDai: null,
    dsWBTC: null,
    iBTC: wbtcToIbtc
  },
  sBTC: {
    ETH: sbtcToEth, 
    WBTC: null, //sbtcToWbtc...failing
    cDai: null,
    dsWBTC: null,
    iBTC: sbtcToIbtc
  }
};

function Transaction({ inputAsset, outputAsset }) {
  const [inputAmount, setInputAmount] = useState("");
  const [allowance, setAllowance] = useState("");
  const { balance } = useGetBalance(assetToAddress(inputAsset), inputAsset);

  useEffect(() => {
    const getAllowance = async () => {
      if (inputAsset !== "ETH" && !!inputAsset) {
        const allowance = await getTokenAllowance(assetToAddress(inputAsset));
        setAllowance(allowance);
        console.log('inputamount', inputAmount)
        console.log('allowance', allowance)
      }
    };
    getAllowance();
  }, [inputAsset]);

  const increaseAllowance = async () => {
    if (inputAsset) {
      await setTokenAllowance(assetToAddress(inputAsset));
    }
  };

  const isApproved = () =>
    inputAsset === "ETH" ? true : allowance > 0 ? true : false;

  const run = async () => {
    if (isApproved()) {
      // run
      if (inputAsset && outputAsset) {
        const func = functionMap[inputAsset][outputAsset];
        console.log("func", func);
        func()
      }
    } else {
      if (inputAsset) {
        increaseAllowance();
      }
    }
  };

  return (
    <div className="d-flex flex-column transaction p-3 my-auto mx-3">
      <div className="mx-auto font-weight-bold tx-headline">Transaction</div>
      <div className="mt-3 tx-text mx-auto">
        Input asset: <span className="tx-asset-text">{inputAsset}</span>
      </div>
      <div className="mt-2 tx-text mx-auto">
        Output asset: <span className="tx-asset-text">{outputAsset}</span>
      </div>
      <div className="mt-4">
        <input
          value={inputAmount}
          onChange={e => setInputAmount(e.target.value)}
          className="tx-input p-1"
          placeholder="Input amount"
        />
      </div>
      <div className="mt-1 input-balance">Balance: {balance}</div>
      <div
        onClick={run}
        className="transact-button mx-auto d-flex justify-content-center align-items-center mt-3"
      >
        {!!inputAsset ? (isApproved() ? "FLIP" : "APPROVE") : "FLIP"}
      </div>
      {!!inputAsset && !isApproved() && (
        <ApproveNotice assetName={inputAsset} />

      )}
    </div>
  );
}

export default Transaction;
