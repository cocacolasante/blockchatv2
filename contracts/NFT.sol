// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    

    constructor() ERC721("Cryptix", "CTX"){}

    function mintNFT(string memory _tokenUri) public returns(uint){
        _tokenIds.increment();

        uint newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenUri);

        return newTokenId;
    }
}