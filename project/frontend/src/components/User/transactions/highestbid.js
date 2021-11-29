import * as React from 'react';
import {makeStyles, CardContent, Grid, Button, Box, Typography } from '@material-ui/core'
import {TabContext, TabList, TabPanel, Timeline, 
    TimelineItem, TimelineOppositeContent,
     TimelineConnector, TimelineSeparator, TimelineDot, TimelineContent} from '@material-ui/lab';
import {AccountCircle} from '@material-ui/icons'
import Carousel from 'react-elastic-carousel';
import {AUCTION_CONTRACT_ADRESS} from "../../config"
import Auction_contract from "../../../chain-info/contracts/Auction_nft.json"
import {utils} from "ethers"
import {useContractFunction, useEthers, useNotifications, useContractCall} from '@usedapp/core'
import {Contract} from "@ethersproject/contracts"
import {useState, useContext, useEffect} from 'react';
import {AccountContext} from "../../UseContext/Account_Context"

export default function Highestbid({id}){
    
    const [AllAuction, setAllAuctionc] = React.useState([])
    const {account_address} = useContext(AccountContext)
    const [state, setState] = useState()
    const {abi} = Auction_contract;

    const AuctionInterface = new utils.Interface(abi)
    const AUCTIONContract = new Contract(AUCTION_CONTRACT_ADRESS, AuctionInterface)
    const _id = id;
    console.log("curr id-->", _id)
    
    const GET_BID =
    useContractCall({
      abi: AuctionInterface,
      address: AUCTION_CONTRACT_ADRESS,
      method: "get_bider",
      args: [_id],
    }) 

console.log("BID GET_BID->", GET_BID)
    if(GET_BID !== undefined){
    return(
        <div>

<Timeline style={{overflow: 'auto'}} position="alternate">
                                
                                <TimelineItem>
                                    <TimelineOppositeContent
                                    sx={{ m: 'auto 0' }}
                                    align="right"
                                    variant="body2"
                                    color="text.secondary"
                                    >
                                    9:30 am
                                    2021-10-18
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot>
                                        <AccountCircle />
                                    </TimelineDot>
                                    <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <Typography variant="h6" component="span">
                                        Highest Bid
                                    </Typography>
                                    <Typography>From {GET_BID[0].substr(0, 13)}</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>


        </div>
    )}

    else{

        return(
            <div>
    
    <Timeline style={{overflow: 'auto'}} position="alternate">
                                    
                                    <TimelineItem>
                                        <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                        >
                                        9:30 am
                                        2021-10-18
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot>
                                            <AccountCircle />
                                        </TimelineDot>
                                        <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Highest Bid
                                        </Typography>
                                        <Typography>No current bids</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
    
    
            </div>
        )
    }

}