const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert, expect } = require("chai");
require("dotenv").config();
const hre = require("hardhat");

describe("BalanceOfUtil", function () {
    let balanceOfUtil;;
    let wallet;
    let provider;

    before(async () => {
        provider = new ethers.JsonRpcProvider("https://fx-json-web3.functionx.io:8545");
        wallet = new ethers.Wallet(process.env.PRIVATEKEY, provider);
        balanceOfUtil = await ethers.getContractAt(
            "BalanceOfUtil",
            "0x86C9d8220A3FA0F258bd98A4899DB9c5310dFA03",
            wallet
        );
        balanceOfUtil = balanceOfUtil.connect(wallet);
    })

    it("Retrieve balances for multiple ERC20 tokens", async () => {
        const blockNumber = await provider.getBlockNumber();
        console.log(blockNumber);
        const contractOwner = await balanceOfUtil.owner();
        console.log(contractOwner);
        //PX, USDT, PURSE, WETH
        const tokens = [
            "0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75",
            "0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265",
            "0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687",
            "0x0CE35b0D42608Ca54Eb7bcc8044f7087C18E7717"
        ]
        const resRaw = await balanceOfUtil.getBalances(
            tokens,
            wallet.address
        )
        console.log(resRaw)
        let res = [];
        resRaw.forEach((val) => {
            res.push(val.toString());
        })
        console.log(res);
        assert.equal(res.length, 4, "Should be an array with four items");
    })
})