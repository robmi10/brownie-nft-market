// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction_nft{
    address payable benificary;
    uint256 public highestBid;
    uint256 public id;

    mapping(uint256 => auction) auction_mapping;
    mapping(address => uint) pendingReturns;

    struct auction{
        uint256 tokenID;
        uint256 timestamp;

        address bider;
        address payable benificary;
        uint256 bid;
        

        bool status;
        string token_URI;
    }
    
    //bid

    event bid_status(uint256);
    event bid_string(string);
    event bid_address(address);

    auction _auc_start;

    uint256 _token_counter;
    
    bool ended = false;
    event HighestBidder(address Highestbidder, uint amount);
    event AuctinoEnded(address winner, uint256 amount);

    event Transfer_auction(address, uint256, uint256);


    function start_auction(address payable _benificary, uint256 _time_input, string memory _token_URI) public payable{
        uint256 auction_time = _time_input + block.timestamp;
        auction_mapping[_token_counter] = auction(_token_counter, auction_time, msg.sender, _benificary, 0, true, _token_URI);
        _token_counter++;
    }

    function bid(uint256 _id) public payable{
        for(uint256 i; i < _token_counter; i++){
            if(_id == auction_mapping[i].tokenID){
                if(block.timestamp > auction_mapping[i].timestamp){
                    emit bid_string("The auction already ended!");

                    revert("The auction already ended!");
                }

                if (msg.value <= auction_mapping[i].bid){
                    emit bid_string("There is already a higher Bid!");

                    revert("There is already a higher Bid!");
                }

                if(auction_mapping[i].bid != 0){
                    emit bid_string("inside bidding");

                    pendingReturns[auction_mapping[i].bider] += auction_mapping[i].bid;
                }
                    emit bid_string("inside msg.value start");
                    auction_mapping[i].bid = msg.value;
                    auction_mapping[i].bider = msg.sender;
            }
        }
    }

    function get_auctionTime(uint _id) public virtual returns(uint){
        uint _time;
        for (uint i = 0; i < _token_counter; i++) {
            if(auction_mapping[i].tokenID == _id){
                _time = auction_mapping[i].timestamp;
            }
        }
        return _time;
    }

    //witdhdraw function
    function witdhdraw(uint256 _id, address _receiver) public payable returns (bool){
   
        for(uint256 i; i < _token_counter; i++){

            if(auction_mapping[i].tokenID == _id){
                uint256 amount = pendingReturns[_receiver];

                emit bid_string("inside witdhraw function");

                emit bid_status(amount);

                emit bid_address(_receiver);
                
                if(amount > 0){
                    pendingReturns[_receiver] = 0;

                    if(!payable(_receiver).send(amount)){
                        pendingReturns[_receiver] = amount;
                        return false;
                    }
                }
            }
        }

        return true;
    }


    function get_bider(uint _id) public virtual returns(address){
        address curr_get_bider_;
       
        for (uint i = 0; i < _token_counter; i++) {
            if(auction_mapping[i].tokenID == _id){
                curr_get_bider_ = auction_mapping[i].bider;
                uint256 curr_get_bid = auction_mapping[i].bid;
                emit bid_address(curr_get_bider_);
                emit bid_status(curr_get_bid);
                emit bid_string("inside get bider");
            }
        }
        return curr_get_bider_;
    }
    

    function end_time(uint256 _id) public payable{
        for(uint256 i; i < _token_counter; i++){
            if(block.timestamp < auction_mapping[i].timestamp){
                emit bid_string("Auction hasn't ended yet!");
                //revert("Auction hasn't ended yet!");
            } 

            if(ended){
                emit bid_string("Ended function has already been called!");
               // revert("Ended function has already been called!");
            }
            if(auction_mapping[i].tokenID == _id ){
                
                auction_mapping[i].benificary.transfer(auction_mapping[i].bid);


                emit AuctinoEnded(auction_mapping[i].bider, auction_mapping[i].bid);

                auction_mapping[i].bid = 0;
                auction_mapping[i].status = false;

                
                ended = true;
            }
        }
    }


    function get_all_auctions() public view returns(auction [] memory){
        auction [] memory allAuction = new auction [](_token_counter);

        for(uint256 i = 0; i < _token_counter; i++){
            auction storage _allAuction = auction_mapping[i];
            allAuction[i] = _allAuction;
        }
        return allAuction;
    }

}
    //timer start

