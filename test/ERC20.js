const { expect } = require("chai");

describe("my token ERC20 contract", function () {

    const ETHERS = 10**18;

    let Token;
    let TokenContract;
    let owner;
    let addr1;
    let addrs;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("myTokenERC20");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        TokenContract = await Token.deploy();
        await TokenContract.deployed();
    });

    describe("Transactions", function () {

        it("Should the balance is replenished and balance request is working", async function () {  
            //balanceOf, mint
            await TokenContract.connect(owner).mint(addr1.address, 5 * ETHERS);
            expect(await TokenContract.balanceOf(addr1.address)).to.equal(5 * ETHERS);
        });

        it("Should the balance is replenished and totalSupply request is working", async function () {  
            //balanceOf, totalSupply
            await TokenContract.connect(owner).mint(addr1.address, 5 * ETHERS);
            await TokenContract.connect(owner).mint(addr2.address, 2 * ETHERS);
            expect(await TokenContract.totalSupply()).to.equal(7 * ETHERS);
        });

        it("Should tokens transfer", async function () {  
            //balanceOf, transfer
            await TokenContract.connect(owner).mint(addr1.address, 5 * ETHERS);
            await TokenContract.connect(addr1).transfer(addr2.address, 2 * ETHERS);
            
            expect(await TokenContract.balanceOf(addr1.address)).to.equal(3 * ETHERS);
            expect(await TokenContract.balanceOf(addr2.address)).to.equal(2 * ETHERS);
        });

        it("Should tokens transfer from", async function () {  
            //approve, allowance
            await TokenContract.connect(owner).mint(owner.address, 5 * ETHERS);
            await TokenContract.connect(owner).approve(addr1.address, 3 * ETHERS);
            await TokenContract.connect(addr1).transferFrom(owner.address, addr2.address, 2 * ETHERS);
            
            expect(await TokenContract.balanceOf(addr2.address)).to.equal(2 * ETHERS);
            expect(await TokenContract.balanceOf(owner.address)).to.equal(3 * ETHERS);
        });


        it("Should tokens approve", async function () {  
            //approve, transferFrom
            await TokenContract.connect(owner).mint(owner.address, 5 * ETHERS);
            await TokenContract.connect(owner).approve(addr1.address, 3 * ETHERS);
            
            expect(TokenContract.allowance(owner.address, addr1.address)).to.equal(3 * ETHERS);
        });
    });
  });