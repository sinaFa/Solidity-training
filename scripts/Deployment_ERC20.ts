import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import {MyERC20__factory} from "../typechain-types"
dotenv.config();

async function main() {
  // This returns a list of 20 wallets for you to play with. Always the same
  const accounts = await ethers.getSigners()

  //const erc20TokenFactory = await ethers.getContractFactory("MyERC20")
  const erc20TokenFactory = new MyERC20__factory(accounts[0])
  const erc20TokenContrat = await erc20TokenFactory.deploy()
  await erc20TokenContrat.deployed()

  console.log(`Contract deployed at address ${erc20TokenContrat.address}`)

  const totalSupply = await erc20TokenContrat.totalSupply();
  console.log(`The total supply of this contract is  ${totalSupply}`)

  const mintTx = await erc20TokenContrat.mint(accounts[0].address, 10);
  await mintTx.wait();

  const totalSupplyAfterMint = await erc20TokenContrat.totalSupply();
  console.log(`The total supply of this contract after minting is  ${totalSupplyAfterMint}`)
  // By default just the owner can mint, buy you can give access to other wallets to mint
  //erc20TokenContrat.grantRole()

  const balanceOfAccount0 = await erc20TokenContrat.balanceOf(accounts[0].address)

  console.log(`The balance of Account 0  (address: ${accounts[0].address}) in this contract is ${balanceOfAccount0} before the transfer`);


  //const balanceOfAccount1 = await erc20TokenContrat.balanceOf(accounts[1].address);

  //console.log(`The balance of Account 1  (address: ${accounts[1].address})
  // in this contract is ${balanceOfAccount1} before the transfer`)


  // We transfer some money from account 0 to account 1
  console.log(`Now let's transfer some money to account 1 with address: ${accounts[1].address}`)
  const transferTx = await erc20TokenContrat.transfer(accounts[1].address,1)
  await transferTx.wait();

  const balanceOfAccount0After = await erc20TokenContrat.balanceOf(accounts[0].address)


  console.log(`The balance of Account 0 in this contract is ${balanceOfAccount0After} after the transfer`)

  const balanceOfAccount1 = await erc20TokenContrat.balanceOf(accounts[1].address)
  console.log(`The balance of Account 1 in this contract is ${balanceOfAccount1} after the transfer`)

  const balanceOfAccount2 = await erc20TokenContrat.balanceOf(accounts[19].address)
  console.log(`The balance of Account 2 in this contract is ${balanceOfAccount2} after the transfer`)



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// To run

// yarn hardhat clean
// yarn hardhat compile

//yarn hardhat run scripts/Deployment_ERC20.ts