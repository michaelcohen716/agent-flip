pragma solidity 0.4.18;

interface SynthetixProxy {
    function exchange(bytes32 sourceCurrencyKey, uint sourceAmount, bytes32 destinationCurrencyKey, address destinationAddress) public returns (bool);
}
