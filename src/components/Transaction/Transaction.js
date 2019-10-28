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
  sbtcToIbtc,
  ethToCdai,
  ibtcToEth,
  FlipAgentEthers
} from "../../services/flipContract";
import { getTokenAllowance, setTokenAllowance } from "../../services/erc20";
import { ERC20Contract } from "../../services/uniswap";
import { assetToAddress } from "../../utils/assets";
import useGetBalance from "../../hooks/useGetBalance";
import Web3 from "web3";
import "./Transaction.css";

export const functionMap = {
  ETH: {
    WBTC: ethToWbtc,
    sBTC: ethToSbtc,
    cDai: ethToCdai,
    dsWBTC: null,
    iBTC: ethToIbtc
  },
  WBTC: {
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
    iBTC: null //sbtcToIbtc...failing
  },
  cDai: {
    ETH: null,
    WBTC: null,
    cDai: null, 
    dsWBTC: null,
    sBTC: null
  },
  iBTC: {
    ETH: ibtcToEth,
    WBTC: null,
    cDai: null, 
    dsWBTC: null,
    sBTC: null
  }
};

function Transaction({ inputAsset, outputAsset, forceRerender }) {
  const [inputAmount, setInputAmount] = useState("");
  const [allowance, setAllowance] = useState("");
  const [txProcessing, setTxProcessing] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false)
  const { balance } = useGetBalance(assetToAddress(inputAsset), inputAsset);

  const web3 = new Web3(window.ethereum); 

  useEffect(() => {
    const getAllowance = async () => {
       
      if (inputAsset !== "ETH" && !!inputAsset) {
        const allowance = await getTokenAllowance(assetToAddress(inputAsset));
        setAllowance(allowance);
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

  const getAllowance = async () => {
    if (inputAsset !== "ETH" && !!inputAsset) {
      const allowance = await getTokenAllowance(assetToAddress(inputAsset));
      setAllowance(allowance);
    }
  };  

  const run = async () => {
    if(!inputAsset) return;
    setTxSuccess(false);

    if (isApproved()) {
      setTxProcessing(true)
      // run
      if (inputAsset.length > 0 && outputAsset.length > 0) {
        const func = functionMap[inputAsset][outputAsset];
        await func(inputAmount);

        const token = inputAsset === "ETH" ? outputAsset : inputAsset;
        console.log('token', token)

        // seth
        const contr = await ERC20Contract("0x0Df1B6d92feBCA3B2793AfA3649868991CC4901D");
        contr.on("Transfer", (a, b, c) => {
          setTxProcessing(false);
          setTxSuccess(true);
          setInterval(() => {
            forceRerender();
          }, 1000);
        })

        // wbtc
        const contr2 = await ERC20Contract("0x3dff0dce5fc4b367ec91d31de3837cf3840c8284")
        contr2.on("Transfer", (a, b, c) => {
          setTxProcessing(false);
          setTxSuccess(true);
          setInterval(() => {
            forceRerender();
          }, 1000);
        })

      }
    } else {
      if (inputAsset) {
        setTxProcessing(true)

        if(inputAsset === "ETH") return;
        increaseAllowance();
        const contr = await ERC20Contract(assetToAddress(inputAsset));
        contr.on("Approval", (a, b, c) => {
          setTxSuccess(true)
          setTxProcessing(false)
          setInterval(() => {
            getAllowance();
            forceRerender();
          }, 1000);
        })
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
      <div className="mt-1 input-balance">Input validations coming soon</div>
      <div
        onClick={run}
        className="transact-button mx-auto d-flex justify-content-center align-items-center mt-3"
      >
        {txProcessing ? "Processing..." : (!!inputAsset ? (isApproved() ? "FLIP" : "APPROVE") : "FLIP")}
      </div>
      {txSuccess && (
        <div className="tx-success mx-auto">
          Transaction success!
        </div>
      )}
      {!!inputAsset && !isApproved() && (
        <ApproveNotice assetName={inputAsset} />

      )}
    </div>
  );
}

export default Transaction;
