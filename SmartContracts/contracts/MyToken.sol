// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/// @custom:security-contact adityapatkar22@gmail.com, archeelparekh11@gmail.com
contract MyToken is ERC1155, AccessControl, ERC1155Supply {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");

    struct Token {
        address payable tokenAdmin;
        uint256 rate;
    }
    uint256 _currentTokenIndex = 0;
    Token[] _tokens;
    address[] private _tokenHolders;
    mapping(address => bool) _tokenHoldersMapping;

    struct Poll {
        string question;
        string[] options;
        uint256[] votes;
    }
    mapping(uint256 => Poll[]) pollsMapping;
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) votedMapping;

    event AddNewToken(
        address tokenAdmin,
        uint256 tokenID,
        uint256 amount,
        uint256 rate
    );
    event BuyToken(
        address tokenAdmin,
        address buyer,
        uint256 tokenID,
        uint256 amount,
        bytes data
    );
    event Disburse(
        address tokenAdmin,
        address holder,
        uint256 tokenID,
        bool success,
        bytes data,
        uint256 amount
    );
    event CreatePoll(address tokenAdmin, uint256 tokenID, Poll[] polls);
    event Vote(address Voter, uint256 tokenID, uint256 pollID, uint256 weight);

    modifier tokenExists(uint256 tokenID) {
        require(
            _tokens[tokenID].tokenAdmin != address(0),
            "Token Does Not Exist"
        );
        _;
    }

    modifier isTokenAdmin(uint256 tokenID) {
        require(_tokens[tokenID].tokenAdmin == msg.sender, "Not Token Admin");
        _;
    }

    modifier notVoted(uint256 tokenID, uint256 pollID) {
        require(!votedMapping[tokenID][pollID][msg.sender], "Already voted");
        _;
    }

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    // Adding a new token
    function addNewToken(
        address payable tokenAdmin,
        uint256 amount,
        uint256 rate
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _tokens.push(Token(tokenAdmin, rate));
        _mint(tokenAdmin, _currentTokenIndex, amount, "");
        emit AddNewToken(tokenAdmin, _currentTokenIndex, amount, rate);
        _currentTokenIndex += 1;
    }

    // Buying a new token
    function buyToken(uint256 tokenID) public payable tokenExists(tokenID) {
        (bool success, bytes memory data) = _tokens[tokenID].tokenAdmin.call{
            value: msg.value
        }("");
        require(success, "Transaction failed!");
        uint256 amount = msg.value / _tokens[tokenID].rate;
        _safeTransferFrom(
            _tokens[tokenID].tokenAdmin,
            msg.sender,
            tokenID,
            amount,
            data
        );
        emit BuyToken(
            _tokens[tokenID].tokenAdmin,
            msg.sender,
            tokenID,
            amount,
            data
        );
    }

    // Disburse to holders
    function disburse(uint256 tokenID) public payable isTokenAdmin(tokenID) {
        for (uint256 i = 0; i < _tokenHolders.length; i++) {
            uint256 amount = (balanceOf(_tokenHolders[i], tokenID) *
                msg.value) / totalSupply(tokenID);
            (bool success, bytes memory data) = _tokenHolders[i].call{
                value: amount
            }("");
            emit Disburse(
                _tokens[tokenID].tokenAdmin,
                _tokenHolders[i],
                tokenID,
                success,
                data,
                amount
            );
        }
    }

    // Create a poll
    function createPoll(
        uint256 tokenID,
        string memory question,
        string[] memory options
    ) public isTokenAdmin(tokenID) {
        uint256[] memory newVotes = new uint256[](options.length);
        for (uint256 i = 0; i < options.length; i++) {
            newVotes[i] = 0;
        }
        pollsMapping[tokenID].push(Poll(question, options, newVotes));
        emit CreatePoll(msg.sender, tokenID, pollsMapping[tokenID]);
    }

    // Get all polls
    function getPolls(uint256 tokenID) public view returns (Poll[] memory) {
        Poll[] memory allPolls = pollsMapping[tokenID];
        return allPolls;
    }

    // Vote on a poll
    function vote(
        uint256 tokenID,
        uint256 pollID,
        uint256 option
    ) public notVoted(tokenID, pollID) {
        uint256 balance = balanceOf(msg.sender, tokenID);
        pollsMapping[tokenID][pollID].votes[option] += balance;
        votedMapping[tokenID][pollID][msg.sender] = true;
        emit Vote(msg.sender, tokenID, pollID, balance);
    }

    // Get Poll results
    function getPollResults(uint256 tokenID, uint256 pollID)
        public
        view
        returns (string memory, uint256)
    {
        uint256[] memory votesArray = pollsMapping[tokenID][pollID].votes;
        uint256 largest = 0;
        uint256 option = 0;

        for (uint256 i = 0; i < votesArray.length; i++) {
            if (votesArray[i] > largest) {
                largest = votesArray[i];
                option = i;
            }
        }
        string memory answer = pollsMapping[tokenID][pollID].options[option];
        return (answer, largest);
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        if (!_tokenHoldersMapping[to]) {
            _tokenHolders.push(to);
            _tokenHoldersMapping[to] = true;
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
