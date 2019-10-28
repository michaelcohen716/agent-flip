import { useEffect, useState } from "react";
import { getTokenBalance } from "../services/erc20";
import Web3 from "web3";

function useGetBalance(address, name) {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const web3 = new Web3(window.ethereum);
      const addr = web3.eth.accounts.givenProvider.selectedAddress;
      let bal;

      if (name) {
        try {
          if (name === "ETH") {
            bal = await web3.eth.getBalance(addr);
          } else {
            bal = await getTokenBalance(address);
          }
  
          bal =
            name === "WBTC"
              ? (bal / 10 ** 8).toFixed(4)
              : (bal / 10 ** 18).toFixed(4);
        } catch(e){
          bal = "0.0000"
        }
      } else {
        bal = "0.0000";
      }
      setBalance(bal);
    };
    if(window.ethereum){
      console.log('window.eth', window.ethereum)
      getBalance();
    }
  }, []);

  return {
    balance
  };
}

export default useGetBalance;
