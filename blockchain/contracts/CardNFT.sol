// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CardNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    struct Card {
        string name;
        string image;
        string cardType;
        uint256 hp;
        string rarity;
    }

    mapping(uint256 => Card) public cards;

    constructor() ERC721("CardNFT", "CNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintCard(
        address to,
        string memory name,
        string memory image,
        string memory cardType,
        uint256 hp,
        string memory rarity
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = tokenCounter;

        cards[tokenId] = Card(name, image, cardType, hp, rarity);

        _safeMint(to, tokenId);
        tokenCounter++;

        return tokenId;
    }

    function getCard(uint256 tokenId) public view returns (Card memory) {
        return cards[tokenId];
    }
}