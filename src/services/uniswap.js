const { ethers } = require("ethers");
const Web3 = require("web3");
const UniswapFactory = require("../abis/UniswapFactory.json");
const UniswapExchange = require("../abis/UniswapExchange.json");
const ERC20 = require("../abis/ERC20.json");
const Tx = require("ethereumjs-tx").Transaction;
const infuraRopstenUrl =
  "https://ropsten.infura.io/v3/b520d227f8e1479ab2bf09aebb9ea6db";

const web3 = new Web3(new Web3.providers.HttpProvider(infuraRopstenUrl));

const ROPSTEN_UNISWAP_FACTORY = "0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351";
const ROPSTEN_SETH_ADDRESS = "0x0Df1B6d92feBCA3B2793AfA3649868991CC4901D";
const ROPSTEN_SETH_UNI_EXCHANGE = "0x9196c28E45c02C05D056309e2eEbd48095FaC24E";

async function FactoryContract() {
  return await new web3.eth.Contract(UniswapFactory, ROPSTEN_UNISWAP_FACTORY);
}

export async function ExchangeContract() {
  return await new web3.eth.Contract(
    UniswapExchange,
    ROPSTEN_SETH_UNI_EXCHANGE
  );
}

export async function ERC20Contract(address) {
  return await new web3.eth.Contract(
    ERC20,
    address
  )
}

async function TokenContract() {
  return await new web3.eth.Contract(ERC20, ROPSTEN_SETH_ADDRESS);
}

export async function createTokenExchange(_privateKey) {
  const contr = await FactoryContract();
  const func = contr.methods.createExchange(ROPSTEN_SETH_ADDRESS).encodeABI();

  web3.eth.getBlock("latest", false, (error, result) => {
    var _gasLimit = result.gasLimit;

    web3.eth.getGasPrice(async function(error, result) {
      var _gasPrice = result;

      // const _privateKey = process.env.REACT_APP_TEST_PK1;
      const privateKey = Buffer.from(_privateKey, "hex");

      var _hex_gasLimit = web3.utils.toHex(_gasLimit.toString());
      var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());

      const keystore = await web3.eth.accounts.privateKeyToAccount(
        "0x" + _privateKey
      );

      const _from = keystore.address;
      var _trx_count = await web3.eth.getTransactionCount(_from);
      var _hex_Gas = web3.utils.toHex("5000000");

      const rawTx = {
        nonce: web3.utils.toHex(_trx_count),
        to: ROPSTEN_UNISWAP_FACTORY,
        from: _from,
        gasLimit: _hex_gasLimit,
        gas: _hex_Gas,
        gasPrice: _hex_gasPrice,
        data: func
      };

      const tx = new Tx(rawTx, { chain: "ropsten" });
      tx.sign(privateKey);

      var serializedTx = "0x" + tx.serialize().toString("hex");
      web3.eth.sendSignedTransaction(serializedTx.toString("hex"), function(
        err,
        hash
      ) {
        if (err) {
          console.log("err", err);
        } else {
          console.log("Txn Sent and hash is " + hash);
        }
      });
    });
  });
}

export async function addLiquidity(_privateKey) {
  const contr = await ExchangeContract();

  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const func = contr.methods
    .addLiquidity(
      1,
      ethers.constants.MaxUint256, // max tokens
      deadline
    )
    .encodeABI();
  web3.eth.getBlock("latest", false, (error, result) => {
    var _gasLimit = result.gasLimit;

    web3.eth.getGasPrice(async function(error, result) {
      var _gasPrice = result;

      const privateKey = Buffer.from(_privateKey, "hex");

      var _hex_value = web3.utils.toHex(web3.utils.toWei(String(10), "ether"));
      var _hex_gasLimit = web3.utils.toHex(_gasLimit.toString());
      var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());

      const keystore = await web3.eth.accounts.privateKeyToAccount(
        "0x" + _privateKey
      );
      const _from = keystore.address;
      var _trx_count = await web3.eth.getTransactionCount(_from);
      var _hex_Gas = web3.utils.toHex("1000000");

      const rawTx = {
        nonce: web3.utils.toHex(_trx_count),
        to: ROPSTEN_SETH_UNI_EXCHANGE,
        from: _from,
        gasLimit: _hex_gasLimit,
        gas: _hex_Gas,
        gasPrice: _hex_gasPrice,
        value: _hex_value,
        data: func
      };

      const tx = new Tx(rawTx, { chain: "ropsten" });
      tx.sign(privateKey);

      var serializedTx = "0x" + tx.serialize().toString("hex");
      web3.eth.sendSignedTransaction(serializedTx.toString("hex"), function(
        err,
        hash
      ) {
        if (err) {
          console.log("err", err);
        } else {
          console.log("Txn Sent and hash is " + hash);
        }
      });
    });
  });
}

export async function approveERC20(_privateKey) {
  const tokenContr = await TokenContract();
  const approveFunc = tokenContr.methods
    .approve(ROPSTEN_SETH_UNI_EXCHANGE, ethers.constants.MaxUint256)
    .encodeABI();

  web3.eth.getBlock("latest", false, (error, result) => {
    var _gasLimit = result.gasLimit;
    console.log("gaslimit", _gasLimit);

    web3.eth.getGasPrice(async function(error, result) {
      const keystore = await web3.eth.accounts.privateKeyToAccount(
        "0x" + _privateKey
      );
      const _from = keystore.address;

      var _gasPrice = result;

      const privateKey = Buffer.from(_privateKey, "hex");

      var _hex_gasLimit = web3.utils.toHex(_gasLimit.toString());
      var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());

      var _trx_count = await web3.eth.getTransactionCount(_from);
      var _hex_Gas = web3.utils.toHex("5000000");

      const rawTx = {
        nonce: web3.utils.toHex(_trx_count),
        to: ROPSTEN_SETH_ADDRESS,
        from: _from,
        gasLimit: _hex_gasLimit,
        gas: _hex_Gas,
        gasPrice: _hex_gasPrice,
        data: approveFunc
      };

      const tx = new Tx(rawTx, { chain: "ropsten" });
      tx.sign(privateKey);

      var serializedTx = "0x" + tx.serialize().toString("hex");
      web3.eth.sendSignedTransaction(serializedTx.toString("hex"), function(
        err,
        hash
      ) {
        if (err) {
          console.log("err", err);
        } else {
          console.log("Txn Sent and hash is " + hash);
        }
      });
    });
  });
}

export async function sethForEth(valueInSeth, _privateKey) {
  const exchContr = await ExchangeContract();
  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

  const tokens_sold = web3.utils.toWei(String(valueInSeth), "ether");
  console.log("tokens sold", tokens_sold);

  const func = exchContr.methods
    .tokenToEthSwapInput(
      tokens_sold,
      1, // min liquidity
      deadline
    )
    .encodeABI();

  return web3.eth.getBlock("latest", false, (error, result) => {
    var _gasLimit = result.gasLimit;

    return web3.eth.getGasPrice(async function(error, result) {
      var _gasPrice = result;

      const privateKey = Buffer.from(_privateKey, "hex");

      //   var _hex_value = web3.utils.toHex(
      //     web3.utils.toWei(String(valueInSeth), "ether")
      //   );
      var _hex_gasLimit = web3.utils.toHex(_gasLimit.toString());
      var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());

      const keystore = await web3.eth.accounts.privateKeyToAccount(
        "0x" + _privateKey
      );
      const _from = keystore.address;
      var _trx_count = await web3.eth.getTransactionCount(_from);
      var _hex_Gas = web3.utils.toHex("7000000");

      const rawTx = {
        nonce: web3.utils.toHex(_trx_count),
        to: ROPSTEN_SETH_UNI_EXCHANGE,
        from: _from,
        gasLimit: _hex_gasLimit,
        gas: _hex_Gas,
        gasPrice: _hex_gasPrice,
        data: func
      };

      const tx = new Tx(rawTx, { chain: "ropsten" });
      tx.sign(privateKey);

      var serializedTx = "0x" + tx.serialize().toString("hex");
      return await web3.eth.sendSignedTransaction(
        serializedTx.toString("hex"),
        function(err, hash) {
          if (err) {
            console.log("err", err);
            return err;
          } else {
            console.log("Txn Sent and hash is " + hash);
            return hash;
          }
        }
      );
    });
  });
}

export async function ethForSeth(valueInEth, _privateKey) {
  const exchContr = await ExchangeContract();
  const DEADLINE_FROM_NOW = 60 * 15;
  const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;
  const func = exchContr.methods.ethToTokenSwapInput(1, deadline).encodeABI();

  return web3.eth.getBlock("latest", false, (error, result) => {
    var _gasLimit = result.gasLimit;

    return web3.eth.getGasPrice(async function(error, result) {
      var _gasPrice = result;

      const privateKey = Buffer.from(_privateKey, "hex");

      var _hex_value = web3.utils.toHex(
        web3.utils.toWei(String(valueInEth), "ether")
      );
      var _hex_gasLimit = web3.utils.toHex(_gasLimit.toString());
      var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());

      const keystore = await web3.eth.accounts.privateKeyToAccount(
        "0x" + _privateKey
      );
      const _from = keystore.address;
      var _trx_count = await web3.eth.getTransactionCount(_from);
      var _hex_Gas = web3.utils.toHex("5000000");

      const rawTx = {
        nonce: web3.utils.toHex(_trx_count),
        to: ROPSTEN_SETH_UNI_EXCHANGE,
        from: _from,
        gasLimit: _hex_gasLimit,
        gas: _hex_Gas,
        gasPrice: _hex_gasPrice,
        value: _hex_value,
        data: func
      };

      const tx = new Tx(rawTx, { chain: "ropsten" });
      tx.sign(privateKey);

      var serializedTx = "0x" + tx.serialize().toString("hex");
      return await web3.eth.sendSignedTransaction(
        serializedTx.toString("hex"),
        function(err, hash) {
          if (err) {
            console.log("err", err);
            return err;
          } else {
            console.log("Txn Sent and hash is " + hash);
            return hash;
          }
        }
      );
    });
  });
}
