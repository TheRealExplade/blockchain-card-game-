// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CardNFT.sol";

contract Trade {
    CardNFT public nft;

    struct TradeOffer {
        address from;
        address to;
        uint256 offeredToken;
        uint256 requestedToken;
        bool active;
    }

    TradeOffer[] public trades;

    constructor(address nftAddress) {
        nft = CardNFT(nftAddress);
    }

    // create trade offer
    function createTrade(
        address to,
        uint256 offeredToken,
        uint256 requestedToken
    ) public {
        require(nft.ownerOf(offeredToken) == msg.sender, "Not owner");

        trades.push(TradeOffer({
            from: msg.sender,
            to: to,
            offeredToken: offeredToken,
            requestedToken: requestedToken,
            active: true
        }));
    }

    // accept trade
    function acceptTrade(uint256 id) public {
        TradeOffer storage t = trades[id];

        require(t.active, "Inactive");
        require(t.to == msg.sender, "Not your trade");

        // 🔥 IMPORTANT CHECKS
        require(nft.ownerOf(t.offeredToken) == t.from, "Sender no longer owns");
        require(nft.ownerOf(t.requestedToken) == msg.sender, "You don't own requested");

        // 🔥 TRANSFERS (will fail if not approved)
        nft.transferFrom(t.from, msg.sender, t.offeredToken);
        nft.transferFrom(msg.sender, t.from, t.requestedToken);

        t.active = false;
        }

        function getTrades() public view returns (TradeOffer[] memory) {
            return trades;
    }


    function cancelTrade(uint256 id) public {
        TradeOffer storage t = trades[id];

        require(t.active, "Trade inactive");
        require(t.from == msg.sender, "Not your trade");

        t.active = false;
    }

    function declineTrade(uint256 id) public {
        TradeOffer storage t = trades[id];

        require(t.active, "Trade inactive");
        require(t.to == msg.sender, "Not your trade");

        t.active = false;
    }
}