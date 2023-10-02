// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

interface Multicall {
    struct Call {
        address target;
        bytes callData;
    }
    function aggregate(Call[] memory calls) external view returns (uint256 blockNumber, bytes[] memory returnData);
}

contract BalanceOfUtil is Ownable {
    address public multicallAddress = 0xC43a7181654639556e4caca1bf9219C14a106401;

    function updateMulticallAddress(address _addr) public onlyOwner {
        require(_addr != address(0), "Cannot be zero address");
        multicallAddress = _addr;
    }

    function getBalances(address[] calldata tokenAddressesArr, address userAddress) public view returns (uint256[] memory) {
        uint256 arrLength = tokenAddressesArr.length;
        uint256[] memory balances = new uint256[](arrLength);
        Multicall.Call[] memory calls = new Multicall.Call[](arrLength);

        for (uint256 i = 0; i < arrLength; i++) {
            calls[i] = Multicall.Call({
                target: tokenAddressesArr[i],
                callData: abi.encodeWithSignature("balanceOf(address)", userAddress)
            });
        }

        (, bytes[] memory returnedData) = Multicall(multicallAddress).aggregate(calls);
        for (uint256 i = 0; i < returnedData.length; i++) {
            if (returnedData[i].length == 32) {
                balances[i] = abi.decode(returnedData[i], (uint256));
            } else {
                balances[i] = 0;
            }
        }
        return balances;
    }

}