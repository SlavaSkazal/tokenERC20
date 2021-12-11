const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    await hre.run('compile');
    
    const Token = await ethers.getContractFactory("myTokenERC20");
    const token = await Token.deploy("Hello, Hardhat!");
  
    console.log("Token ERC20 deployed to:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });