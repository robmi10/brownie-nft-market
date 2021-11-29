from brownie import accounts, config, NFT, Auction_nft
from scripts.helpful_script import get_account
from web3 import Web3

import yaml
import json
import os
import shutil

def deploy_app(_update_frontend = False):
    account = get_account()
    nft_deploy = NFT.deploy({"from": account})
    auction_deploy = Auction_nft.deploy({"from": account})
    

    if _update_frontend:
        update_frontend()

    return nft_deploy, auction_deploy


def update_frontend():
    copy_folders_to_front_end("./build", "./frontend/src/chain-info")

    with open("./brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader = yaml.FullLoader)
        with open("./frontend/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
        print("Frontend updated!")

def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_app(_update_frontend = True)