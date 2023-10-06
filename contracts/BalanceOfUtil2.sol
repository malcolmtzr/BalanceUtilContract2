// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract BalanceOfUtil2 {

    function getNativeBalance(address userAddress) public view returns (uint256) {
        return userAddress.balance;
    }
}