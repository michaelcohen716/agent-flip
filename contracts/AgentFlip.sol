pragma solidity ^0.4.18;

import "./ERC20Interface.sol";
import "./KyberNetworkProxy.sol";
import "./SynthetixProxy.sol";
import "./SafeDecimalMath.sol";

interface UniswapExchangeInterface {
    function getEthToTokenInputPrice(uint) external view returns (uint);
    function getEthToTokenOutputPrice(uint) external view returns (uint);
    function getTokenToEthInputPrice(uint) external view returns (uint);
    function getTokenToEthOutputPrice(uint) external view returns (uint);
    function ethToTokenTransferInput(uint, uint, address) external payable returns (uint);
    function ethToTokenSwapInput(uint, uint) external payable returns (uint);
    function ethToTokenTransferOutput(uint, uint, address) external payable returns (uint);
    function ethToTokenSwapOutput(uint, uint) external payable returns (uint);
    function tokenToEthTransferInput(uint, uint, uint, address) external returns (uint);
    function tokenToEthTransferOutput(uint, uint, uint, address) external returns (uint);
    function addLiquidity(uint, uint,uint) external payable returns(uint);
}

interface ISynthetix {
    function exchange(
        bytes32 sourceCurrencyKey,
        uint sourceAmount,
        bytes32 destinationCurrencyKey,
        address destinationAddress) external returns (bool);
}

contract IFeePool {
    address public FEE_ADDRESS;
    uint public exchangeFeeRate;
    function amountReceivedFromExchange(uint value) external view returns (uint);
    function amountReceivedFromTransfer(uint value) external view returns (uint);
    function feePaid(bytes32 currencyKey, uint amount) external;
    function appendAccountIssuanceRecord(address account, uint lockedAmount, uint debtEntryIndex) external;
    function setRewardsToDistribute(uint amount) external;
}

interface IExchangeRates {
    function effectiveValue(bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey) public view returns (uint);

    function rateForCurrency(bytes32 currencyKey) public view returns (uint);

    function anyRateIsStale(bytes32[] currencyKeys) external view returns (bool);

    function rateIsStale(bytes32 currencyKey) external view returns (bool);
}

contract AgentFlip {
    // Variables
    KyberNetworkProxy public kyberNetworkProxyContract;
    SynthetixProxy public SynthetixProxyContract;

    // ropsten
    address public proxySynthetix = 0x013AE307648f529aa72c5767A334DDd37aaB43c3;
    address public uniswapSethExchange = 0x9196c28E45c02C05D056309e2eEbd48095FaC24E; 
    address public feePoolAddress = 0x0B7e1DC538e1A8Db415Ab1D4c5107325Dd4BD705;
    address public exchangeRates = 0x22f1ba6dB6ca0A065e1b7EAe6FC22b7E675310EF;

    address public proxySbtc = 0xC1701AbD559FC263829CA3917d03045F95b5224A;
    address public proxyIbtc = 0xdFb8e9bA49737Cd0E235975FF164298Fc625b762;
    address public sethERC20 = 0x0df1b6d92febca3b2793afa3649868991cc4901d;

    // Events
    event Swap(address indexed sender, ERC20 srcToken, ERC20 destToken);

    uint256 constant UINT256_MAX = ~uint256(0);

    // Functions
    /**
     * @dev Contract constructor
     * @param _kyberNetworkProxyContract KyberNetworkProxy contract address
     */
    function AgentFlip(
        KyberNetworkProxy _kyberNetworkProxyContract
    ) public {
        kyberNetworkProxyContract = _kyberNetworkProxyContract;
    }

    /**
     * @dev Gets the conversion rate for the destToken given the srcQty.
     * @param srcToken source token contract address
     * @param srcQty amount of source tokens
     * @param destToken destination token contract address
     */
    function getConversionRates(
        ERC20 srcToken,
        uint srcQty,
        ERC20 destToken
    ) public
      view
      returns (uint, uint)
    {
      return kyberNetworkProxyContract.getExpectedRate(srcToken, destToken, srcQty);

    }

    /**
     * @dev Swap the user's ERC20 token to another ERC20 token/ETH
     * @param srcToken source token contract address
     * @param srcQty amount of source tokens
     * @param destToken destination token contract address
     * @param destAddress address to send swapped tokens to
     * @param maxDestAmount address to send swapped tokens to
     */
    function executeSwap(
        ERC20 srcToken,
        uint srcQty,
        ERC20 destToken,
        address destAddress,
        uint maxDestAmount
    ) public {
        uint minConversionRate;

        // Check that the token transferFrom has succeeded
        require(srcToken.transferFrom(msg.sender, address(this), srcQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(srcToken.approve(address(kyberNetworkProxyContract), 0));

        // Set the spender's token allowance to tokenQty
        require(srcToken.approve(address(kyberNetworkProxyContract), srcQty));

        // Get the minimum conversion rate
        (minConversionRate,) = kyberNetworkProxyContract.getExpectedRate(srcToken, destToken, srcQty);

        // Swap the ERC20 token and send to destAddress
        kyberNetworkProxyContract.trade(
            srcToken,
            srcQty,
            destToken,
            destAddress,
            maxDestAmount,
            minConversionRate,
            0 //walletId for fee sharing program
        );

        // Log the event
        Swap(msg.sender, srcToken, destToken);
    }

    bytes32 sEthCurrencyKey = "sETH";
    bytes32 sBtcCurrencyKey = "sBTC";
    bytes32 iBtcCurrencyKey = "iBTC";

    function swapEthForSbtc(uint deadline) public payable returns(uint receivedAmt) {
        UniswapExchangeInterface uniContract = UniswapExchangeInterface(uniswapSethExchange);
        ERC20(sethERC20).approve(uniswapSethExchange, UINT256_MAX);

        ISynthetix synContract = ISynthetix(proxySynthetix);

        uint sEthAmt = uniContract.ethToTokenSwapInput.value(msg.value)(1, deadline);
        receivedAmt = _sTokenAmtRecvFromExchangeByToken(sEthAmt, sEthCurrencyKey, sBtcCurrencyKey);
        require (synContract.exchange (sEthCurrencyKey, sEthAmt, sBtcCurrencyKey, address(this)));

        require (ERC20(proxySbtc).transfer(msg.sender, receivedAmt));
    }

    function swapEthForIbtc(uint deadline) public payable returns(uint receivedAmt) {
        UniswapExchangeInterface uniContract = UniswapExchangeInterface(uniswapSethExchange);
        ERC20(sethERC20).approve(uniswapSethExchange, UINT256_MAX);

        ISynthetix synContract = ISynthetix(proxySynthetix);

        uint sEthAmt = uniContract.ethToTokenSwapInput.value(msg.value)(1, deadline);
        receivedAmt = _sTokenAmtRecvFromExchangeByToken(sEthAmt, sEthCurrencyKey, iBtcCurrencyKey);
        require (synContract.exchange (sEthCurrencyKey, sEthAmt, iBtcCurrencyKey, address(this)));

        require (ERC20(proxyIbtc).transfer(msg.sender, receivedAmt));
    }

    uint8 public constant decimals = 18;
    uint public constant UNIT = 10 ** uint(decimals);

    function _sTokenAmtRecvFromExchangeByToken (uint srcAmt, bytes32 srcKey, bytes32 dstKey) internal view returns (uint){
        IFeePool feePool = IFeePool(feePoolAddress);
        IExchangeRates synRatesContract = IExchangeRates(exchangeRates);
        uint dstAmt = synRatesContract.effectiveValue(srcKey, srcAmt, dstKey);
        uint feeRate = feePool.exchangeFeeRate();
        uint subbed = sub(UNIT, feeRate);
        return multiplyDecimal(dstAmt, subbed);
    }


    // Safe Math
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    function multiplyDecimal(uint x, uint y)
        internal
        pure
        returns (uint)
    {
        /* Divide by UNIT to remove the extra factor introduced by the product. */
        return mul(x, y) / UNIT;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }
}

