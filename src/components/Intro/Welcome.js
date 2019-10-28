import React from "react";
import detective from "../../assets/detective.png";
import "./Intro.css";

function Welcome({ setIntroState, injectedWeb3 }) {
  const connect = async () => {
    console.log('injected web3', injectedWeb3)
    if(injectedWeb3){
      await window.ethereum.enable();
      setIntroState(1);
    }
  };

  return (
    <div className="d-flex flex-column mt-5">
      <div className="d-flex mx-auto flex-column">
        <div className="mx-auto">
          <img src={detective} className="welcome-logo" />
        </div>
        <div className="mx-auto welcome-headline">Agent Flip</div>
        <div onClick={connect} className="connect-btn px-3 py-2 mt-3 mx-auto">
          {injectedWeb3 ? "Connect Wallet" : "Pending Web3..."}
        </div>
        <div className="mt-3 subheader">
          A bridge between DeFi trading protocols
        </div>
      </div>
    </div>
  );
}

export default Welcome;
