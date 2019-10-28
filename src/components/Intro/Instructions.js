import React, { useEffect } from "react";
import detective from "../../assets/detective.png";
import getWeb3 from "../../getWeb3";
import "./Intro.css";

function Instructions({ setIntroState }) {
  const advance = async () => {
    setIntroState(2);
  };

  return (
    <div className="d-flex flex-column mt-5">
      <div className="d-flex mx-auto flex-column">
        <div className="mx-auto">
          <img src={detective} className="welcome-logo" />
        </div>
        <div className="mx-auto welcome-headline">Agent Flip</div>
        <div className="mx-auto instructions mt-3">
            Agent Flip allows you - the investor - to "flip" <br/> 
            positions in one easy contract call. <br/>
            Long? Short? Collateralized? Synthetic? Neutral? <br/>
            Agent Flip handles all kinds of positions.
        </div>
        <div className="mt-3 instructions">
            Try converting some <b className="">Ropsten ETH</b> to WBTC to start!
        </div>
         <div onClick={advance} className="connect-btn px-3 py-2 mt-3 mx-auto">
          Start
        </div>
      </div>
    </div>
  );
}

export default Instructions;
