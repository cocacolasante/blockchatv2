const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("User Profile", () =>{
    let ProfileContract, NFTContract, deployer, user1, user2

    beforeEach(async()=>{
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]

        const profileContractFactory = await ethers.getContractFactory("Profile")
        ProfileContract = await profileContractFactory.deploy()
        await ProfileContract.deployed()

        
    })
    it("checks the contract was deployed", async () =>{
        expect(await ProfileContract.admin()).to.equal(deployer.address)
    })
    it("checks the create profile function", async () =>{
        await ProfileContract.connect(user1).createProfile("cocacolasante")

        const user1Profile = (await ProfileContract.users(user1.address))
        expect(user1Profile.username).to.equal("cocacolasante")
        expect(user1Profile.user).to.equal(user1.address)
        
    })
    it("checks the status was updated", async () =>{
        await ProfileContract.connect(user1).createProfile("cocacolasante")
        await ProfileContract.connect(user1).setStatus("test")

        const user1Profile = (await ProfileContract.users(user1.address))
        expect(user1Profile.status).to.equal("test")
        

    })
    describe("NFT Contract", () =>{
        beforeEach(async () =>{
            const nftContractFactory = await ethers.getContractFactory("NFT")
            NFTContract = await nftContractFactory.deploy()
            await NFTContract.deployed()

            
        }) 
        it("cbecks the mint function",async () =>{
            await NFTContract.connect(user1).mintNFT("SAMPLE_URI")

            expect(await NFTContract.tokenURI(1)).to.equal("SAMPLE_URI")
        })
        it("checks the token owner", async () =>{
            await NFTContract.connect(user1).mintNFT("SAMPLE_URI")

            expect(await NFTContract.ownerOf(1)).to.equal(user1.address)
        })
        describe("NFT and Profile interaction", () =>{
            beforeEach(async () =>{
                await ProfileContract.connect(user1).createProfile("cocacolasante")
                await ProfileContract.connect(user1).setStatus("test")
                await NFTContract.connect(user1).mintNFT("SAMPLE_URI")
            })
            it("checks the profile nft contract was set", async () =>{
                await ProfileContract.connect(user1).setProfileNFT(NFTContract.address, "1")
                const user1Profile = (await ProfileContract.users(user1.address))
                expect(user1Profile.nftContract).to.equal(NFTContract.address)
                expect(user1Profile.nftTokenId).to.equal("1")
                
            })
        })
    })
})