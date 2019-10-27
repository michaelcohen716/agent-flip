export const ASSETS = [
  {
    name: "ETH",
    tooltipContent:
      "The reserve asset. Try converting ETH into a BTC position.",
    address: ""
  },
  {
    name: "WBTC",
    tooltipContent: "Collateralized long position. BitGo custodial WBTC.",
    address: "0x3dff0dce5fc4b367ec91d31de3837cf3840c8284" // ropsten
  },
  {
    name: "sBTC",
    tooltipContent: "Synthetic long position. Synthetix Synth sBTC.",
    address: "0xC1701AbD559FC263829CA3917d03045F95b5224A" // ropsten
  },
  {
    name: "cDai",
    tooltipContent: "Neutral, interest-earning position. Compound cDAI.",
    address: "0x2B536482a01E620eE111747F8334B395a42A555E" // ropsten
  },
  {
    name: "dsWBTC",
    tooltipContent:
      "Collateralized short position. bZx Perpetual 1x Short WBTC.",
    address: "0xdFb8e9bA49737Cd0E235975FF164298Fc625b762" // IWBTC ropsten [REPLACE WITH CORRECT]
  },
  {
    name: "iBTC",
    tooltipContent: "Synthetic short position. Synthetix Synth iBTC.",
    address: "0xdFb8e9bA49737Cd0E235975FF164298Fc625b762" // ropsten
  }
];

export const assetToAddress = asset => {
  const mapping = {
    ETH: ASSETS[0].address,
    WBTC: ASSETS[1].address,
    sBTC: ASSETS[2].address,
    cDai: ASSETS[3].address,
    dsWBTC: ASSETS[4].address,
    iBTC: ASSETS[5].address
  };

  return mapping[asset];
};
