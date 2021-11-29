import * as React from 'react';
import {makeStyles, CardContent, Grid, Button, Box, Typography } from '@material-ui/core'
import Carousel from 'react-elastic-carousel';
import {AUCTION_CONTRACT_ADRESS} from "./config"
import Auction_contract from "../chain-info/contracts/Auction_nft.json"
import {utils} from "ethers"
import {useContractFunction, useEthers, useNotifications, useContractCall} from '@usedapp/core'
import {Contract} from "@ethersproject/contracts"
import {useState, useContext, useEffect} from 'react';
import {AccountContext} from "../components/UseContext/Account_Context"
import {VideoBg} from "../components/Design/design" 
import Timer from "../components/User/transactions/Timer/Timer"
import {formatUnits} from "@ethersproject/units"
import Bid from './User/transactions/bid';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

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
        marginTop: -10
    },

    circular: {
        width: 450,
        height: 450,
        position: 'absolute',
        left: 408,
        marginTop: 30
    },

    box: {
        background: "rgb(255, 255, 255)",
        width: 250,
        height: 350,
      
   
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


export default function Auctionmarket(){
    const [value, setvalue] = React.useState(0)
    const [render, setRender] = React.useState(0)
    const [nfts_acc, setNfts_acc] = React.useState([])
    const [price, setPrice] = useState();

    const [bidnft, setBidnft] = useState();

    const [address_index, setAddress_index] = useState();

    const {bidstate, setBidstate} = useContext(AccountContext)

    const {searchinput} = useContext(AccountContext)
    const [searchList, setsearchList] = React.useState([])

    const [AllAuction, setAllAuctionc] = React.useState([])
    const {account_address} = useContext(AccountContext)
    const {abi} = Auction_contract;

    const AuctionInterface = new utils.Interface(abi)
    const AUCTIONContract = new Contract(AUCTION_CONTRACT_ADRESS, AuctionInterface)
   

    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 2, itemsToScroll: 1 },
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
    

    console.log("AUCTIONMARKET All_NFTS->", All_NFTS)
    
    

    const Curr_list = All_NFTS

    const handle_list = (list) =>{
        console.log("list inside handle--->", list)
        setNfts_acc(list)
    }
    const handle_change = (e, value) =>{
        setvalue(value)
    }

    useEffect (() =>{
        if(Curr_list != undefined){
    
            console.log("nftlist ->", nfts_acc)
            console.log("inside useeffect Curr_list->", Curr_list)
            console.log("inside useeffect Curr_list Length->", Curr_list.length)
            
            const list = []
            Curr_list[0].map((nfts, i) =>{
                var j = 0;
                console.log("inside nfts loop->", nfts)
    
                console.log("inside nfts loop data ->", nfts["token_URI"])
    
                    if(account_address !== nfts["_user"] || 1 === 1){
                        j = j+ 1
                        console.log("inside loop nft", nfts)
                        console.log("inside loop nft url", nfts[1][2])
                        fetch(nfts["token_URI"].toString()).then((res, error) =>{
                            if(res){
                                console.log("result fetch ->", res)
                                res.json().then((result) =>{
                                    console.log("final json result ->", result)
                                
                                    list.push(result)   
                                    
                                    console.log("pushed to list ->", list)
                                    console.log("SEARCH INPUT DEFINE ->", searchinput)
                                    if(searchinput !== undefined){
                                        const newFilterList = list.filter((val) =>{
                                            return Object.values(val)
                                            .join(" ").toLowerCase()
                                            .includes(searchinput.toLowerCase())
                                        })
            
                                        setsearchList(newFilterList)
                                    }
                                    else{
                                        console.log("LIST SET IT -->", list)
                                        setsearchList(list)
                                    }
                                   
                                    }
                                )
                            }else{
                                console.log("error ->", error)
                            }
                        })
                    }
                })
            }}, [All_NFTS, searchinput])


    console.log("Auctiondashboard nfts_acc -->", nfts_acc)

    console.log("Auctiondashboard Time new-->", AllAuction)

    const handle_render_buy = ((nfts, index) =>{
        console.log("inside handle_render_buy->", nfts)

        console.log("inside handle_render_buy index->", index)

        console.log("inside handle_ ALL NFT->", All_NFTS)

        console.log("handle_render_buy ALL NFT new", All_NFTS[0][index]["bider"])
        console.log("handle_render_buy ALL NFT new", All_NFTS[0])

        setAddress_index(index)
        setBidnft(nfts)
        setBidstate(true)
    })


   if(searchList.length > 0){
    return(
        <div align="center">    

        <h1 className="h1_connect">Auction</h1>
            
        <p className="format_color">All Auctions in the market</p>

        <Carousel breakPoints={breakPoints} {...settings}>
        
               
        {searchList.map((nfts, index) =>{

            {console.log("inside nfts acc mapping render --->", nfts_acc)}

            {console.log("inside nfts acc image --->", nfts.image.replace(/['"]+/g, ''))}
            if(nfts.image_format === false ){
            return(
                        <Box className={classes.box} >
                                    <CardContent sx={{ flex: '1 0 auto' }}>

                                        <img style={{height: 200, width: 210, borderRadius: 10,}} src={nfts.image.replace(/['"]+/g, '')}></img>
                                        <p></p>
                                        <p className="format_color"> {nfts.description}</p>
                                        
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {console.log("parseFloat(formatUnits(AllAll_NFTSAuction[0][index][], 18))", parseFloat(formatUnits(All_NFTS[0][index]["timestamp"], 0)))}
                        
                                        <Timer countdownTimestampMs={parseFloat(formatUnits(All_NFTS[0][index]["timestamp"], 0))}/>
                                        </Typography>
                                    </CardContent>

                                    <Button className={classes.button} onClick={()=>{
                                        handle_render_buy(nfts, index);
                                        setPrice(nfts.price);
                                        }} variant = "contained" color="primary">Bid</Button>
                                
                                </Box>
                    )}
                else{

                    return(
                        <Box className={classes.box} >
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <VideoBg  style={{height: 200, width: 210, borderRadius: 10}} autoPlay loop muted src={nfts.image.replace(/['"]+/g, '')} type='video/mp4'></VideoBg>
                            <p></p>
                            <p className="format_color"> {nfts.description}</p>
                            
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                            {console.log("AllAuction[0][index][timestamp] -->", All_NFTS[0][index]["timestamp"])}
                            {console.log("parseFloat(formatUnits(AllAuction[0][index][], 18))", parseFloat(formatUnits(All_NFTS[0][index]["timestamp"], 0)))}
                            

                            <Timer countdownTimestampMs={parseFloat(formatUnits(All_NFTS[0][index]["timestamp"], 0))}/>
                            </Typography>
                        </CardContent>

                        <Button className={classes.button} onClick={()=>{
                            handle_render_buy(nfts, index);
                            setPrice(nfts.price);
                            }} variant = "contained" color="primary">Bid</Button>
                    </Box>

                    )


                }
        })}      

            {console.log("bidstate---->", bidstate)}
            {bidstate ? <Bid index = {address_index} address = {All_NFTS[0][address_index]["bider"]} nfts={bidnft} price={price}/>: console.log("Render is false")} 
            
            </Carousel>
        </div>
    )}  return(
        <div>

                <div className={classes.circular}>
                    <CircularProgress color="secondary" />
                </div>
                
        </div>
    )
}