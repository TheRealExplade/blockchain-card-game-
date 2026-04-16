// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CardNFT.sol";

contract Marketplace {
    struct Listing {
        address seller;
        uint256 price;
    }
    uint256[] public listedTokenIds;
    CardNFT public nft;

    mapping(uint256 => Listing) public listings;

    constructor(address nftAddress) {
        nft = CardNFT(nftAddress);
    }

    function listCard(uint256 tokenId, uint256 price) public {
        require(nft.ownerOf(tokenId) == msg.sender, "Not owner");

        nft.transferFrom(msg.sender, address(this), tokenId);

        listings[tokenId] = Listing(msg.sender, price);
        listedTokenIds.push(tokenId); // 👈 ADD THIS
    }

    function getAllListings() public view returns (uint256[] memory) {
        return listedTokenIds;
    }

    function buyCard(uint256 tokenId) public payable {
        Listing memory listing = listings[tokenId];

        require(msg.value >= listing.price, "Not enough ETH");

        payable(listing.seller).transfer(msg.value);

        nft.transferFrom(address(this), msg.sender, tokenId);

        delete listings[tokenId];

        // 🔥 REMOVE FROM ARRAY
        for (uint i = 0; i < listedTokenIds.length; i++) {
            if (listedTokenIds[i] == tokenId) {
                listedTokenIds[i] = listedTokenIds[listedTokenIds.length - 1];
                listedTokenIds.pop();
                break;
            }
        }
    }
}