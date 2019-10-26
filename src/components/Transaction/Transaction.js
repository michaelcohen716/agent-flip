import React, { useState } from "react";
import "./Transaction.css";

function Transaction({ inputAsset, outputAsset }) {
  const [inputAmount, setInputAmount] = useState("");

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
      <div className="mt-1 input-balance">Balance: 0.0001</div>
      <div className="transact-button mx-auto d-flex justify-content-center align-items-center mt-3">
        FLIP
      </div>
    </div>
  );
}

export default Transaction;
