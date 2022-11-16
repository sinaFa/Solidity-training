import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";


import * as dotenv from "dotenv";
import {MyERC20, MyERC20__factory} from "../typechain-types"
dotenv.config();


describe("Basic tests for understanding ERC20", async () => {
    let accounts;
    let erc20TokenContrat: MyERC20;

    beforeEach(async () =>  {
      accounts = await ethers.getSigners();
      const erc20TokenFactory = new MyERC20__factory(accounts[0]);
      erc20TokenContrat = await erc20TokenFactory.deploy();
      await erc20TokenContrat.deployed();   
    });

    it("Should have zero total supply at deployment", async()=>{
      const totalSupply = await erc20TokenContrat.totalSupply();
      expect(totalSupply).to.eq(0);
      

    });

    it("triggers the Transfer event with the address of the sender when sending transactions", async()=>{
      
    });
});
