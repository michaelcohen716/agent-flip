pragma solidity ^0.4.18;

import "./ERC20Interface.sol";
import "./KyberNetworkProxy.sol";

contract AgentFlip {
    // Variables
    KyberNetworkProxy public kyberNetworkProxyContract;
    ERC20 constant internal ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);
    address internal daiTokenAddress = address(0xaD6D458402F60fD3Bd25163575031ACDce07538D);

    // Events
    event LogShortEthForDai(address indexed sender, uint amount);
    event LogDaiToLongEth(address indexed sender, uint amount);

    /**
     * @dev Contract constructor
     * @param _kyberNetworkProxyContract KyberNetworkProxy contract address
     */
    function AgentFlip(
        KyberNetworkProxy _kyberNetworkProxyContract
    ) public {
        kyberNetworkProxyContract = _kyberNetworkProxyContract;
    }

    //TO-DO Add modifiers to setter functions
    /**
    * @dev Set DAI token address
    * @param _daiAddress DAI token address
    **/
    function setDaiTokenAddress(address _daiAddress) external {
        daiTokenAddress = _daiAddress;
    }

    /**
    * @dev Swap the user's ETH to DAI token
    **/
    function shortEthForDai() public payable {
        uint minConversionRate;
        ERC20 token = ERC20(daiTokenAddress);
        address destAddress = msg.sender;

        // Get the minimum conversion rate
        (minConversionRate,) = kyberNetworkProxyContract.getExpectedRate(ETH_TOKEN_ADDRESS, token, msg.value);

        // Swap the ETH to ERC20 token
        uint destAmount = kyberNetworkProxyContract.swapEtherToToken.value(msg.value)(token, minConversionRate);

        // Send the swapped tokens to the destination address
        require(token.transfer(destAddress, destAmount));

        // Log the event
        LogShortEthForDai(msg.sender, destAmount);
    }

    /**
    * @dev Swap the user's DAI tokens for ETH
    * @param tokenQty Number of DAI tokens to swap
    **/
    function daiToLongEth(uint tokenQty) public {
        uint minConversionRate;
        ERC20 token = ERC20(daiTokenAddress);
        address destAddress = msg.sender;

        //For this to work, user must call approve to give allowance to this contract

        // Check that the token transferFrom has succeeded
        require(token.transferFrom(msg.sender, address(this), tokenQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(token.approve(address(kyberNetworkProxyContract), 0));

        // Set the spender's token allowance to tokenQty
        require(token.approve(address(kyberNetworkProxyContract), tokenQty));

        // Get the minimum conversion rate
        (minConversionRate,) = kyberNetworkProxyContract.getExpectedRate(token, ETH_TOKEN_ADDRESS, tokenQty);

        // Swap the ERC20 token to ETH
        uint destAmount = kyberNetworkProxyContract.swapTokenToEther(token, tokenQty, minConversionRate);

        // Send the swapped ETH to the destination address
        destAddress.transfer(destAmount);

        // Log the event
        LogDaiToLongEth(msg.sender, tokenQty);
    }

    //@dev Swap the user's ERC20 token to ETH
    //@param token source token contract address
    //@param tokenQty amount of source tokens
    //@param destAddress address to send swapped ETH to
    function execSwap(ERC20 token, uint tokenQty, address destAddress) public {
        uint minConversionRate;

        // Check that the token transferFrom has succeeded
        require(token.transferFrom(msg.sender, address(this), tokenQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(token.approve(address(kyberNetworkProxyContract), 0));

        // Set the spender's token allowance to tokenQty
        require(token.approve(address(kyberNetworkProxyContract), tokenQty));

        // Get the minimum conversion rate
        (minConversionRate,) = kyberNetworkProxyContract.getExpectedRate(token, ETH_TOKEN_ADDRESS, tokenQty);

        // Swap the ERC20 token to ETH
        uint destAmount = kyberNetworkProxyContract.swapTokenToEther(token, tokenQty, minConversionRate);

        // Send the swapped ETH to the destination address
        destAddress.transfer(destAmount);

        // Log the event
        //Swap(msg.sender, token, destAmount);
    }

    //Fallback function
    function() public payable {}
}

