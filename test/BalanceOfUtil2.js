const { assert, expect } = require("chai");
require("dotenv").config();
const hre = require("hardhat");

describe("BalanceOfUtil2", function () {
  let balanceOfUtil2;
  let wallet;
  let provider;

  before(async () => {
    provider = new ethers.JsonRpcProvider(process.env.RPCURL);
    wallet = new ethers.Wallet(process.env.PRIVATEKEY, provider);
    balanceOfUtil2 = await ethers.getContractAt(
      "BalanceOfUtil2",
      "0xe16E060b801b8723Ce42FaB3303CB03CCa6eA892",
      wallet
    );
    balanceOfUtil2 = balanceOfUtil2.connect(wallet);
  })

  it("Retrieve balance for FX token", async () => {
    const bal = await balanceOfUtil2.getNativeBalance(wallet.address)
    console.log(bal)
    assert.equal(bal, 66172033548270000000n);
  })
})
