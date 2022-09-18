pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./klaytn-contracts/token/KIP17/KIP17Token.sol";
import "./klaytn-contracts/ownership/Ownable.sol";
import "./klaytn-contracts/math/SafeMath.sol";
import "./klaytn-contracts/utils/Address.sol";

contract Bridge is Ownable {
    using SafeMath for uint256;
    using Address for address;

    KIP17Token private origin;
    KIP17Token private latest;

    constructor(address _origin, address _latest) public {
        origin = KIP17Token(_origin);
        latest = KIP17Token(_latest);
    }

    function name() public view returns(string memory, string memory) {
        return (origin.name(), latest.name());
    }

    function migration() public returns(bool) {
        uint256 tokenId;

        for (uint256 i = 0; i < origin.balanceOf(msg.sender); i.add(1)) {
            tokenId = origin.tokenOfOwnerByIndex(msg.sender, i);
            origin.transferFrom(msg.sender, address(0xdead), tokenId);
            latest.transferFrom(owner(), msg.sender, tokenId);
        }
        return true;
    }

    // function migrationForOwner(uint256[] memory tokenId) public onlyOwner returns(bool) {
    //     for (uint256 i = 0; i < tokenId.length; i.add(1)) {
    //         origin.transferFrom(msg.sender, address(0xdead), tokenId[i]);
    //     }

    //     return true;
    // }

    // function airdrop(address[] memory user, uint256[] memory tokenId) public onlyOwner returns(bool) {
    //     for (uint256 i = 0; i < tokenId.length; i.add(1)) {
    //         latest.transferFrom(owner(), user[i], tokenId[i]);
    //     }

    //     return true;
    // }

    // function minting(uint256 [] memory tokenId, string [] memory uri) public onlyOwner returns(bool) {
    //     for(uint i = 0; i < tokenId.length; i++) {
    //         latest.mintWithTokenURI(msg.sender, tokenId[i], uri[i]);
    //     }

    //     return true;
    // }
}