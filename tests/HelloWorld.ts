import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// https://github.com/dethcrypto/TypeChain
import { HelloWorld } from "../typechain-types";

// https://mochajs.org/#getting-started
describe("HelloWorld", function () {
  let helloWorldContract: HelloWorld;
  let signers : SignerWithAddress[];

  // https://mochajs.org/#hooks
  beforeEach(async function () {
    // https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#helpers
    signers = await ethers.getSigners();
    // https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#helpers
    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    // https://docs.ethers.io/v5/api/contract/contract-factory/#ContractFactory-deploy
    helloWorldContract = await helloWorldFactory.deploy() as HelloWorld;
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-deployed
    await helloWorldContract.deployed();
  });

  it("Should give a Hello World", async function () {
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall
    const helloWorldText = await helloWorldContract.helloWorld();
    // https://www.chaijs.com/api/bdd/#method_equal
    expect(helloWorldText).to.equal("Hello World");
  });

  it("Should set owner to deployer account", async function () {
    
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall
    const contractOwner = await helloWorldContract.owner();
    // https://www.chaijs.com/api/bdd/#method_equal
    expect(contractOwner).to.equal(signers[0].address);
  });

  it("Should not allow anyone other than owner to call transferOwnership", async function () {
    // https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html#helpers
   
    // https://docs.ethers.io/v5/api/contract/contract/#Contract-connect
    // https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend
    // https://hardhat.org/hardhat-chai-matchers/docs/overview#reverts
    await expect(
      helloWorldContract
        .connect(signers[1])
        .transferOwnership(signers[1].address)
    ).to.be.revertedWith("Caller is not the owner");
  });

  it("Should execute transferOwnership correctly", async function () {
    // TODO
    throw Error("Not implemented");
  });

  it("Should not allow anyone other than owner to change text", async function () {
    const newText = "New text"
    await expect(helloWorldContract.connect(signers[1]).setText(newText)).to.be.reverted
  });

  it("Should change text correctly", async function () {
    const newText = "New text"
    const tx = await helloWorldContract.setText(newText);
    await tx.wait()
    const text = await helloWorldContract.helloWorld();
    expect(text).to.equal(newText)
  });
});