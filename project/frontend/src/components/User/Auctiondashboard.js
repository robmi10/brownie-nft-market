import * as React from 'react';
import {makeStyles, CardContent, Grid, Button, Box, Typography } from '@material-ui/core'
import Carousel from 'react-elastic-carousel';
import {AUCTION_CONTRACT_ADRESS} from "../config"
import Auction_contract from "../../chain-info/contracts/Auction_nft.json"
import {utils} from "ethers"
import {useContractFunction, useEthers, useNotifications, useContractCall} from '@usedapp/core'
import {Contract} from "@ethersproject/contracts"
import {useState, useContext, useEffect} from 'react';
import {AccountContext} from "../../components/UseContext/Account_Context"
import {VideoBg} from "../../components/Design/design" 
import Timer from './transactions/Timer/Timer';
import {formatUnits} from "@ethersproject/units"
import Grow from '@mui/material/Grow';

const theme = makeStyles({
    text:{
        color: 'rgb(0, 0, 0)',
    },
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center', 
        marginTop: 20
    },
    button:{
        marginTop: 20
    },
    carousel:{
        marginTop: 30,
        height: 450,
    },
    box: {
        background: "rgb(255, 255, 255)",
        width: 420,
        height: 450,
      
   
        boxShadow: '0 3px 5px 2px rgb(255, 255, 255)',
        position: 'relative',
             left: 0,
             top: 0,
             '&:hover': {
             boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
             },
             "&:focus" :{
             outline: "none",
             } 
    },
})


export default function Auctiondashboard(){
    const [value, setvalue] = React.useState(0)
    const [render, setRender] = React.useState(0)
    const [nfts_acc, setNfts_acc] = React.useState([])

    const [AllAuction, setAllAuctionc] = React.useState([])
    const {account_address} = useContext(AccountContext)
    const {abi} = Auction_contract;

    const AuctionInterface = new utils.Interface(abi)
    const AUCTIONContract = new Contract(AUCTION_CONTRACT_ADRESS, AuctionInterface)
   

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
       
      ];
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    const classes = theme();

  
    const All_NFTS =
        useContractCall({
          abi: AuctionInterface,
          address: AUCTION_CONTRACT_ADRESS,
          method: "get_all_auctions",
          args: [],
        }) 
    

    console.log("Auctiondashboard All_NFTS->", All_NFTS)
    
    useEffect (() =>{
       
        
        if(Curr_list != undefined){

            setAllAuctionc(Curr_list)

            console.log("nftlist ->", nfts_acc)
            console.log("inside Auctiondashboard Curr_list->", Curr_list)
            console.log("inside Auctiondashboard Curr_list Length->", Curr_list.length)
            
            const list = []
            Curr_list[0].map((nfts, i) =>{
                var j = 0;
                console.log("inside Auctiondashboard nfts loop->", nfts)

                console.log("inside Auctiondashboard nfts loop data  ->", nfts["token_URI"])
   

                if(account_address === nfts["benificary"]){
                    j = j+ 1
                    console.log("inside loop nft", nfts)
                    console.log("inside token_URI loop nft url", nfts["token_URI"])
                    fetch(nfts["token_URI"].toString()).then((res, error) =>{
                        if(res){
                            console.log("result fetch ->", res)
                            res.json().then((result) =>{
                                console.log("final json result ->", result)
                            
                                list.push(result)   
                                console.log("pushed to list ->", list)
                                setRender(1)
                                }
                            )
                        }else{
                            console.log("error ->", error)
                        }
                    })
             
                }
            })

            console.log("list -->", list)

            handle_list(list)
            
        }
      

    }, [])

    useEffect(() =>{
        console.log("Update useeffect 2")
    },[render])

    const Curr_list = All_NFTS

    const handle_list = (list) =>{
        console.log("list inside handle--->", list)
        setNfts_acc(list)
    }
    const handle_change = (e, value) =>{
        setvalue(value)
    }


    console.log("Auctiondashboard nfts_acc -->", nfts_acc)

    console.log("Auctiondashboard Time new-->", AllAuction)

    if(nfts_acc.length > 0){
    return(
        <div align="center">    
        <Carousel  breakPoints={breakPoints} {...settings}>
               
        {nfts_acc.map((nfts, index) =>{

            {console.log("inside nfts acc mapping render --->", nfts_acc)}

            {console.log("nfts.image_format --->", nfts.image_format)}

            {console.log("inside nfts acc image --->", nfts.image.replace(/['"]+/g, ''))}
            if(nfts.image_format ===false ){
            return(

                <Grow in={nfts.image_format == false}  style={{ transformOrigin: '0 0 0' }}
                {...(nfts.image_format == false? { timeout: 1000 } : {})}>
                        <Box className={classes.box} >
                                    <CardContent sx={{ flex: '1 0 auto' }}>

                                        <img style={{height: 315, width: 330, borderRadius: 10,}} src={nfts.image.replace(/['"]+/g, '')}></img>
                                        <p></p>
                             
                                        <h1 className="h1_connect">{nfts.title}</h1>

                                        <p className="format_color"> {nfts.description}</p>
                                        <Timer countdownTimestampMs={parseFloat(formatUnits(AllAuction[0][index]["timestamp"], 0))}/>
    
                                    </CardContent>
                                </Box>
                            </Grow>
                    )}
                else{

                    return(


                        <Grow in={nfts.image_format == true}  style={{ transformOrigin: '0 0 0' }}
                        {...(nfts.image_format == true? { timeout: 1000 } : {})}>
                        <Box className={classes.box} >
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <VideoBg  style={{height: 315, width: 330, borderRadius: 10}} autoPlay loop muted src={nfts.image.replace(/['"]+/g, '')} type='video/mp4'></VideoBg>
                            <p></p>
                
                            <h1 className="h1_connect">{nfts.title}</h1>

                            <p className="format_color"> {nfts.description}</p>
                            <Timer countdownTimestampMs={parseFloat(formatUnits(AllAuction[0][index]["timestamp"], 0))}/>
                
                        </CardContent>
                    </Box>
                    </Grow>

                    )


                }
        })}      
        </Carousel>     
              
       
        </div>
    )}

    return(
        <div>

                
                
        </div>
    )
}