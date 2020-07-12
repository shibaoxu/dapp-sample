const factory = artifacts.require("ERC20Factory");
const token = artifacts.require("ERC20");
const truffleAssert = require("truffle-assertions");

contract("ERC20Factory", (accounts) => {
  let ntcInstance;
  const name = "新致币";
  const symbol = "NTC";
  const initialAmount = 10000;
  const decimals = 18;

  describe("getCreated", () => {
    it("'created' of ERC20Factory should be empty", async () => {
      const factoryInstance = await factory.deployed();
      const created = await factoryInstance.getCreated(accounts[0]);
      assert.equal(created.length, 0, "create should be empty");
    });
  });

  describe("createERC20", () => {
    it("deploy 'Newtouch Coin'", async () => {
      const factoryInstance = await factory.deployed();
      await factoryInstance.createERC20(
        initialAmount,
        name,
        decimals,
        symbol
      );
      const created = await factoryInstance.getCreated(accounts[0]);
      assert.equal(created.length, 1, "deploy success");
      ntcInstance = await token.at(created[0]);
    });
    it("verify the initial value", async () => {
      assert.equal(
        await ntcInstance.name(),
        name,
        `name should be <${name}>`
      );
      assert.equal(
        await ntcInstance.symbol(),
        symbol,
        `symbol should be <${symbol}>`
      );
      assert.equal(
        await ntcInstance.totalSupply(),
        initialAmount,
        `initial amount should be <${initialAmount}>`
      );
      assert.equal(
        await ntcInstance.decimals(),
        decimals,
        `decimals should be <${decimals}>`
      );
      assert.equal(
        await ntcInstance.balanceOf(accounts[0]),
        initialAmount,
        `balance of owner should be <${initialAmount}>`
      );
      assert.equal(
        await ntcInstance.balanceOf(accounts[1]),
        0,
        `balance of other should be <0>`
      );
    });
  });

  describe("tranfer", () => {
    it("transfer success", async () => {
      const amount = 120;
      await ntcInstance.transfer(accounts[1], amount);
      assert.equal(
        await ntcInstance.balanceOf(accounts[0]),
        initialAmount - amount,
        `balance of account[0] should be ${initialAmount - amount}`
      );
      assert.equal(
        await ntcInstance.balanceOf(accounts[1]),
        amount,
        `balance of account[1] should be ${amount}`
      );
    });
    it("can not exceed balance", async () => {
      const balance1 = (await ntcInstance.balanceOf(accounts[1])).toNumber();
      await truffleAssert.reverts(
        ntcInstance.transfer(accounts[1], 100, { from: accounts[2] }),
        "ERC20: transfer amount execeeds balance"
      );
      assert.equal(
        (await ntcInstance.balanceOf(accounts[1])).toNumber(),
        balance1
      );
      assert.equal(await ntcInstance.balanceOf(accounts[2]), 0);
    });
  });

  describe("approve", () => {
    it("approve success", async () => {
      await ntcInstance.approve(accounts[4], 1000, { from: accounts[0] });
      const allowed = await ntcInstance.allowance(accounts[0], accounts[4]);
      assert.equal(allowed, 1000, `allowed should be 1000`);
    });
    it("approve success: exceed balance", async () => {
      ntcInstance.approve(accounts[4], 150, { from: accounts[1] });
    });
  });

  describe("transferFrom", () => {
    it("transfer success", async () => {
      const amount = 500;
      const beforeTransfer = await ntcInstance.allowance(
        accounts[0],
        accounts[4]
      );
      await ntcInstance.transferFrom(accounts[0], accounts[5], amount, {
        from: accounts[4],
      });
      const afterTransfer = await ntcInstance.allowance(
        accounts[0],
        accounts[4]
      );
      assert.equal(
        afterTransfer,
        beforeTransfer - amount,
        `allowacne of account[4] should be ${beforeTransfer - amount}`
      );
    });
    it("transfer fail because execute allowed amount", async () => {
      await truffleAssert.reverts(
        ntcInstance.transferFrom(accounts[0], accounts[6], 600, {
          from: accounts[4],
        }),
        "ERC20: transfer amount exceeds allowance"
      );
    });

    it("transfer fail becase exceed balance", async () => {
      await truffleAssert.reverts(
        ntcInstance.transferFrom(accounts[1], accounts[6], 130),
        "ERC20: transfer amount execeeds balance"
      );
    });
  });

  describe("increaseAllowance", () => {
    const amount = 100;
    it("increate success", async () => {
      assert.equal(
        await ntcInstance.balanceOf(accounts[7]),
        0,
        `balance of account[7] shoule be <0>`
      );
      assert.equal(
        await ntcInstance.allowance(accounts[0], accounts[7]),
        0,
        `allowed of account[7] shoule be <0>`
      );
      await ntcInstance.increaseAllowance(accounts[7], amount, {
        from: accounts[0],
      });
      assert.equal(
        await ntcInstance.allowance(accounts[0], accounts[7]),
        amount,
        `allowed of account[7] shoule be <${amount}>`
      );
      await ntcInstance.increaseAllowance(accounts[7], amount, {
        from: accounts[0],
      });
      assert.equal(
        await ntcInstance.allowance(accounts[0], accounts[7]),
        2 * amount,
        `allowed of account[7] shoule be <${2 * amount}>`
      );
    });
  });

  describe("decreaseAllowance", () => {
    it("descreate success", async () => {
      const amount = 100;
      assert.equal(
        await ntcInstance.allowance(accounts[0], accounts[7]),
        2 * amount,
        `allowed of account[7] shoule be <${2 * amount}>`
      );
      await ntcInstance.decreaseAllowance(accounts[7], amount, {
        from: accounts[0],
      });
      assert.equal(
        await ntcInstance.allowance(accounts[0], accounts[7]),
        amount,
        `allowed of account[7] shoule be <${amount}>`
      );
      await ntcInstance.decreaseAllowance(accounts[7], amount, {
        from: accounts[0],
      });
      assert.equal(
        await ntcInstance.allowance(accounts[0], accounts[7]),
        0,
        `allowed of account[7] shoule be <0>`
      );
    });
    it("descreate fail: below zero", async () => {
      await truffleAssert.reverts(
        ntcInstance.decreaseAllowance(accounts[7], 10, { from: accounts[0] }),
        "ERC20: decreated allowance below zero"
      );
    });
  });
});
