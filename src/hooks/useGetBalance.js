import { useEffect, useState } from "react";
import { getTokenBalance, web3 } from "../services/erc20";

function useGetBalance(address, name) {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const addr = web3.eth.accounts.givenProvider.selectedAddress;
      let bal;

      if (name) {
        if (name === "ETH") {
          bal = await web3.eth.getBalance(addr);
        } else {
          bal = await getTokenBalance(address);
        }

        bal =
          name === "WBTC"
            ? (bal / 10 ** 8).toFixed(4)
            : (bal / 10 ** 18).toFixed(4);
      } else {
        bal = "0.0000";
      }
      setBalance(bal);
    };
    getBalance();
  });

  return {
    balance
  };
}

export default useGetBalance;
