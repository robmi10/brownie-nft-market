// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/token/ERC721/ERC721.sol";
import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "OpenZeppelin/openzeppelin-contracts@4.0.0/contracts/access/Ownable.sol";
import "./bid.sol";

contract NFT is ERC721URIStorage, Ownable, Auction_nft{

    struct Users{
        uint256 _id;
        address _user;
        string _token_uri;
        string _username;
    }

    struct User_NFT{
        mapping(uint256 => Users) token_map_list;
        mapping(uint256 => string) Ownertoken_URI;
        mapping(uint256 => string) User_name;
        mapping(uint256 => address) User_address;
    }

    event Curr_string(string);

    event Curr_address(address);

    event Curr_name(string);

    event Curr_amount(uint256);

    event Transfer_auction(address, address, uint256);

    User_NFT user_nft_;

    uint256 public _counter;

    constructor() ERC721("Robel", "RBT") {}

    function create_nft(address _user, string memory _tokenURI, string memory _username_) public{
        _mint(_user, _counter);
        _setTokenURI(_counter, _tokenURI);

        user_nft_.token_map_list[_counter] = Users(_counter, _user, _tokenURI, _username_);
        user_nft_.Ownertoken_URI[_counter] = _tokenURI;
        user_nft_.User_name[_counter] = _username_;
        user_nft_.User_address[_counter] = _user;
        _counter ++;
    }
    
    function get_token_counter() public returns (uint256){
        return _counter;
    }
 
    function get_username(address _input) public returns (string memory){
         string memory curr_string_name;
         
         for(uint256 i = 0; i < _counter; i++){
             if(_input == user_nft_.User_address[i]){
                curr_string_name = user_nft_.User_name[i];
                 emit Curr_name(curr_string_name);
             }
         }
         return curr_string_name;
    } 

    function get_all_auction_nft() public{
        super.get_all_auctions();
    }

    function transfer_nft_auction(address _from, uint256 _id) public{
        uint256 _time = super.get_auctionTime(_id);
        require(block.timestamp < _time, "Auction hasn't ended yet");
        address _to = super.get_bider(_id);
        
        for(uint256 i = 0; i < _counter; i++){
            if(i == _id){
                string memory curr_username = get_username(_to); 
                string memory curr_URI = user_nft_.Ownertoken_URI[i];
                
                emit Curr_string(curr_URI);
                emit Curr_address(_to);
                emit Transfer_auction(_from, _to, _id); 
               

                user_nft_.token_map_list[i] =  Users(_id ,_to, curr_URI, curr_username);
            }
        }
    }

    function transfer_nft(address to_receiver, uint256 _id) public{
        for(uint256 i = 0; i < _counter; i++){
            if(i == _id){
                string memory curr_username = get_username(to_receiver); 
                string memory curr_URI = user_nft_.Ownertoken_URI[i];
                emit Curr_string(curr_URI);
                user_nft_.token_map_list[i] =  Users(_id ,to_receiver, curr_URI, curr_username);
            }
        }
    }


    function get_all_nfts() public view returns(Users [] memory){
        Users [] memory allNfts = new Users [](_counter);
        
        for(uint i = 0; i < _counter; i++){
            Users storage _allNfts = user_nft_.token_map_list[i];
            allNfts[i] = _allNfts;
        }
        return allNfts;
    }



}