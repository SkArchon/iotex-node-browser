//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "hardhat/console.sol";

contract IotexApiGatewayBadge is Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;

    struct BadgeDetail {
        uint256 tokenId;
        string badgeType;
    }

    Counters.Counter private tokenIdTracker;

    mapping(uint256 => string) private _tokenIdBadgeKeyMapping;
    mapping(uint256 => string) private _tokenIdNodeAddressMapping;

    // We use node address since it is more reliable
    // i.e. in the event that on the service a node is
    // accidentally or purposesly removed and regenerated
    // for the same address will have a different id
    mapping(string => uint256[]) private _nodeAddressTokenIdMapping;

    string private constant nftSymbol = "IAGB";
    string private constant nftName = "Iotex Api Gateway Badge";

    constructor() ERC721(nftName, nftSymbol) {}

    function getDetails() external view returns (uint256) {
        return tokenIdTracker.current();
    }

    function getNodeBadges(string[] memory nodeAddresses)
        external
        view
    returns (BadgeDetail[][] memory) {
        BadgeDetail[][] memory badgesPerNode = new BadgeDetail[][](nodeAddresses.length);

        for (uint256 k = 0; k < nodeAddresses.length; k++) {
            uint256[] memory tokens = _nodeAddressTokenIdMapping[
                nodeAddresses[k]
            ];
            BadgeDetail[] memory _nodeBadges = new BadgeDetail[](tokens.length);

            for (uint256 i = tokens.length; i > 0; i--) {
                uint256 index = i - 1;
                uint256 tokenId = tokens[index];
                BadgeDetail memory badge = BadgeDetail(
                    tokenId,
                    _tokenIdBadgeKeyMapping[tokenId]
                );
                _nodeBadges[index] = badge;
            }

            badgesPerNode[k] = _nodeBadges;
        }

        return badgesPerNode;
    }

    function isTokenAlreadyCreated(
        string memory badgeKey,
        address userAddress,
        string memory nodeAddress
    ) private view returns (bool) {
        uint256 tokensForOwner = ERC721.balanceOf(userAddress);
        for (uint256 i = tokensForOwner; i > 0; i--) {
            uint256 index = i - 1;
            uint256 tokenId = tokenOfOwnerByIndex(userAddress, (index));

            bool isBadgePresentForUser = keccak256(bytes(_tokenIdBadgeKeyMapping[tokenId])) == keccak256(bytes(badgeKey));
            bool isBadgePresentForExistingNode = keccak256(bytes(_tokenIdNodeAddressMapping[tokenId])) == keccak256(bytes(nodeAddress));

            if (isBadgePresentForUser && isBadgePresentForExistingNode) {
                return true;
            }
        }
        return false;
    }

    function mintBadge(
        string memory badgeKeyMaping,
        address userAddress,
        string memory nodeAddress
    ) external {
        require(
            !isTokenAlreadyCreated(badgeKeyMaping, userAddress, nodeAddress),
            "The token has already been created for that type"
        );
        uint256 tokenId = tokenIdTracker.current();
        tokenIdTracker.increment();

        _safeMint(userAddress, tokenId);
        _tokenIdBadgeKeyMapping[tokenId] = badgeKeyMaping;
        _tokenIdNodeAddressMapping[tokenId] = nodeAddress;
        _nodeAddressTokenIdMapping[nodeAddress].push(tokenId);
    }
}
