from brownie import accounts, config, NFT, Auction_nft
from brownie.network import account
import web3
from scripts.helpful_script import get_account
from scripts.deploy import deploy_app
from web3 import Web3

SEND_BALANCE = Web3.toWei(2, 'ether') 

SEND_HIGHER_BALANCE = Web3.toWei(4, 'ether') 

SEND_HIGHEST_BALANCE = Web3.toWei(6, 'ether') 

def test_deploy():
    account = accounts[0]
    account2 = accounts[1]
    account3 = accounts[2]
    account4 = accounts[3]
    account5 = accounts[4]
    account6 = accounts[5]

    print("account ->", account)
    print("account2 ->", account2)
    print("account3 ->", account3)
    print("account4 ->", account4)

    print("account5 ->", account5)

    print("account6 ->", account6)

    nft_contract, auction_contract = deploy_app()
    assert 0 == 1
    return nft_contract, auction_contract, account, account2, account3, account4

    
"""def test_create_nft():
    nft_contract, auction_contract, account, account2, account3, account4 = test_deploy()

    tx = nft_contract.create_nft(account, "hazard_URI", "mike")
    tx.wait(1)

    tx2 = nft_contract.create_nft(account2, "westbrook_URI", "joe")
    tx2.wait(1)

    tx3 = nft_contract.create_nft(account3, "mayweather_URI", "kim")
    tx3.wait(1)

    tx3 = nft_contract.create_nft(account3, "lillard_URI", "jones")
    tx3.wait(1)

    All_user = nft_contract.get_all_nfts()

    counter = nft_contract._counter()

    print("account", account)
    print("account2 ->", account2)
    print("account3 ->", account3)
    print("All_user -->", All_user)
    print("counter -->", counter)

    assert 1 == 1

    return nft_contract, auction_contract, account, account2, account3, account4, All_user
    
def test_transfer_nft():
    nft_contract, auction_contract, account, account2, account3, account4, All_user = test_create_nft()

    tx = nft_contract.transfer_nft(account2, 0)

    print("Events ->", tx.events)

    
    print("All_user inside transfer -->", nft_contract.get_all_nfts())

    assert 1 == 1

def test_auction():
    nft_contract, auction_contract, account, account2, account3, account4, All_user = test_create_nft()

    All_user = test_transfer_nft()

    auction_contract.start_auction(account, 2)

    print("account -->", account) 
    print("account2 -->", account2)  
    print("account3 -->", account3)  
    print("account4 -->", account4)  

    tx = auction_contract.bid(0, {"from": account2, "value": SEND_BALANCE})
    tx.wait(1)

    print("first events ->", tx.events)

    tx2 = auction_contract.bid(0, {"from": account3, "value": SEND_HIGHER_BALANCE})
    tx2.wait(1)

    print("second events ->", tx2.events)


    tx3 = auction_contract.bid(0, {"from": account4, "value": SEND_HIGHEST_BALANCE})
    tx3.wait(1)

    print("third events ->", tx3.events)

    transfer_auction = nft_contract.transfer_nft_auction(account, 0)
    
    print("transfer_auction events->", transfer_auction.events)

    get_bid = auction_contract.get_bider(0)
    
    print("get_bid events->", get_bid.events)

    get_all_auctions = auction_contract.get_all_auctions()

    print("get_all_auctions --->", get_all_auctions)

    tx4 = auction_contract.end_time(0)

    print("fourth events ->", tx4.events)



    print("All_user inside nft_contract -->", nft_contract.get_all_nfts())

    txx = auction_contract.witdhdraw(0, account2)
    txx.wait(1)

    txx2 = auction_contract.witdhdraw(0, account3)
    txx2.wait(1)

    txx3 = auction_contract.witdhdraw(0, account4)
    txx3.wait(1)

    print("witdhraw2 events -->", txx2.events)

    print("witdhraw3 events -->", txx3.events)

    print("account balance -> ", account.balance())

    print("account2 balance -> ", account2.balance())

    print("account3 balance -> ", account3.balance())

    print("account4 balance -> ", account4.balance()) 
    
 
    
    assert 1== 1"""
    
