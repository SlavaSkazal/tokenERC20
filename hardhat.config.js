require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-web3");

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("transfer", "transfer tokens")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, hre) => {

    //const ETHERS = 10**18;
    const ETHERS = 1;
 
    const Token = await hre.ethers.getContractAt("myTokenERC20", taskArgs.account);

    //token = await ethers.getContractFactory("myTokenERC20");

    //Token = await token.deploy();
    //await Token.deployed();

    console.log("check console");
    const resTransfer = await Token.transfer("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 1 * ETHERS);
    console.log(resTransfer);
  });

module.exports = {};