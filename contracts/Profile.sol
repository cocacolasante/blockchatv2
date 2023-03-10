// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Profile{
    address public admin;

    mapping(address => User) public users;

    mapping(address=>address[]) public usersContactList;

    event UserCreated(address user, string username);

    struct User {
        address user;
        string username;
        string status;
        address nftContract;
        uint nftTokenId;
    }

    constructor () {
        admin = msg.sender;
    }

    function createProfile(string memory username) public {
        require(users[msg.sender].user == address(0), "Already created account");

        users[msg.sender] = User(msg.sender, username, "", address(0), 0);

        emit UserCreated(msg.sender, username);

    }

    function setStatus(string memory newStatus) public {
        require(msg.sender == users[msg.sender].user, "not your profile");
        require(users[msg.sender].user != address(0), "No account created");

        users[msg.sender].status = newStatus;

    }

    function setProfileNFT(address nftAddress, uint tokenId) public {
        require(msg.sender == users[msg.sender].user, "not your profile");
        require(users[msg.sender].user != address(0), "No account created");
        require(IERC721(nftAddress).ownerOf(tokenId) == msg.sender, "not your nft" );

        users[msg.sender].nftContract = nftAddress;
        users[msg.sender].nftTokenId = tokenId;

    }

    function addToContact(address newContact) public {
        require(users[msg.sender].user != address(0), "must create profile");
        for (uint i=0; i < usersContactList[msg.sender].length; i++) {
            if (newContact == usersContactList[msg.sender][i]) {
                
                break;
            }
        }
        usersContactList[msg.sender].push(newContact);

    }

    function returnContactList(address user) public view returns(address[] memory){
        address[] memory contactList = new address[](usersContactList[user].length);

        for (uint i=0; i < usersContactList[user].length; i++) {
            contactList[i] = (usersContactList[user][i]);
            }
        
        return contactList;
        
    }



}
