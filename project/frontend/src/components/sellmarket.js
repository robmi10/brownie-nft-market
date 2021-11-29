import "../App.scss"
import Sportleg from "../components/Design/Videos/Sportleg.mp4"
import Tennis from "../components/Design/Videos/Tennis.mp4"
import {makeStyles, CardContent, Grid, Button, Box, Typography } from '@material-ui/core'
import {VideoBg} from "../components/Design/design" 
import Buy from "../components/User/transactions/buy"
import {useState, useContext, useEffect} from 'react';
import {AccountContext} from "../components/UseContext/Account_Context"
import Nft_contract from "../chain-info/contracts/NFT.json"
import {NFT_CONTRACT_ADRESS} from "./config"
import {utils} from "ethers"
import {useContractFunction, useEthers, useNotifications, useContractCall} from '@usedapp/core'
import {Contract} from "@ethersproject/contracts"
import * as React from 'react';
import Auctionmarket from "./auctionmarket"
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },

    box: {
        background: "rgb(255, 255, 255)",
        width: 300,
        height: 350,
        borderRadius: 30,
   
        marginTop: 30,
        boxShadow: '0 3px 5px 2px rgb(255, 255, 255)',
        position: 'relative',
             left: 10,
             top: 0,
             '&:hover': {
             boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
             },
             "&:focus" :{
             outline: "none",
             } 
    },

    button: {
        marginTop: -38,
    },

    loadmore: {
        marginTop: 10,
    }
})

export default function Sellmarketplace(){
    const classes = useStyles()
    const [render, setRender] = useState(false);
    const {buystate, setBuystate} = useContext(AccountContext)
    const {filter_nft, setFilter_nft} = useContext(AccountContext)

    const {sellmarketloading, setSellmarketloading} = useContext(AccountContext)

    const [buynft, setBuynft] = useState();

    const[sliceit, setSlice] = useState(4);

    const [address_index, setAddress_index] = useState();
    const [price, setPrice] = useState();

    const [nfts_acc, setNfts_acc] = React.useState([])

    const [searchList, setsearchList] = React.useState([])

    const [token_uri_address, setToken_uri_address] = React.useState([])
    const {account_address} = useContext(AccountContext)
    const {abi} = Nft_contract;
    const NftInterface = new utils.Interface(abi)
    const NFTContract = new Contract(NFT_CONTRACT_ADRESS, NftInterface)
    const {searchinput} = useContext(AccountContext)

    const handle_render_buy = ((nfts, index) =>{
        console.log("inside handle_render_buy->", nfts)

        console.log("inside handle_render_buy index->", index)

        console.log("handle_render_buy ALL NFT", All_NFTS[0][index]["_user"])

        setAddress_index(index)
        setBuynft(nfts)
        setBuystate(true)
    })
 

    
    const All_NFTS =
        useContractCall({
          abi: NftInterface,
          address: NFT_CONTRACT_ADRESS,
          method: "get_all_nfts",
          args: [],
        }) 
    console.log("All_NFTS->", All_NFTS)

useEffect (() =>{
    if(Curr_list != undefined){

        console.log("nftlist ->", nfts_acc)
        console.log("inside useeffect Curr_list->", Curr_list)
        console.log("inside useeffect Curr_list Length->", Curr_list.length)
        
        const list = []
        Curr_list[0].map((nfts, i) =>{
            var j = 0;
            console.log("inside nfts loop->", nfts)

            console.log("inside nfts loop data ->", nfts["_token_uri"])

                if(account_address !== nfts["_user"] || 1 === 1){
                    j = j+ 1
                    console.log("inside loop nft", nfts)
                    console.log("inside loop nft url", nfts[1][2])
                    fetch(nfts["_token_uri"].toString()).then((res, error) =>{
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
                                    setSellmarketloading(true)
                                    setsearchList(list)
                                }
                               
                                }
                            )
                        }else{
                            console.log("error ->", error)
                        }
                    })
                    
                    setSellmarketloading(true)
                    setNfts_acc(list)
            
                }
            })
        }
    

    }, [All_NFTS, searchinput, render])

  

    const handle_list = (list) =>{
        console.log("list inside handle--->", list)
    }

    const Curr_list = All_NFTS

    const loadmore = (() =>{
        console.log("inside loadmore")
        setSlice(sliceit + sliceit)
    })

    const slice = searchList.slice(0, sliceit)
    
    if(slice.length > 0){
                    return(
                        <div align="center" className="App">

                <h1 className="h1_connect">Market</h1>
                            
                            <p className="format_color">All NFTs in the market</p>

                            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            
                            {slice.map((nfts, index) =>{

                            console.log("INSIDE SELL MARKET FILER LIST search->", searchList)
                
                                    if(nfts.image_format ==true ){
                                        {console.log("inside vide output!!")}
                
                                        return( 
                                            <Grid item xs={3}>

                                            <Fade in = {nfts.image_format}>
                                            <Box className={classes.box} >
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <VideoBg  style={{height: 200, width: 200, borderRadius: 10}} autoPlay loop muted src={nfts.image.replace(/['"]+/g, '')} type='video/mp4'></VideoBg>
                                                <p></p>
                                                <h1 className="h1_connect">{nfts.title}</h1>
                            
                                                <p className="format_color">{All_NFTS[0][index]["_user"].substr(0, 10)}</p>
                
                                                <p className="format_color">{nfts.price} ETH</p>
                                            </CardContent>
                
                                            {console.log("TO BUTTONS NFTS -->", nfts)}
                                            <Button className={classes.button} onClick={()=>{
                                            handle_render_buy(nfts, index);
                                            setPrice(nfts.price);
                                            }} variant = "contained" color="primary">Buy</Button>
                                        </Box>

                                        </Fade>
                                        </Grid>
                    
                                        )
                                    }
                
                                    return( 
                                        
                                            <Grid item xs={3}>
                                                <Fade in={sellmarketloading}>
                                                    <Box className={classes.box} >
                                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                                        
                                                            <img style={{height: 200, width: 200, borderRadius: 10,}} src={nfts.image.replace(/['"]+/g, '')}></img>
                                                            <p></p>
                                                            <h1 className="h1_connect">{nfts.description}</h1>
                            
                                                            <p className="format_color">{All_NFTS[0][index]["_user"].substr(0, 10)}</p>
                
                                                            <p className="format_color">{nfts.price} ETH</p>
                
                                                        </CardContent>
                
                                                        <Button className={classes.button} onClick={()=>{
                                                handle_render_buy(nfts, index);
                                                setPrice(nfts.price);
                                            }} variant = "contained" color="primary">Buy</Button>
                                                    </Box>
                                            </Fade>
                                            </Grid>
                                    
                                    )
                                })}
                
                                
                
                                {buystate ? console.log("buynft --->", buynft): console.log("buynft is false")} 
                                {buystate ? <Buy index = {address_index} address = {All_NFTS[0][address_index]["_user"]} nfts={buynft} price={price}/>: console.log("Render is false")} 
                            </Grid>
                
                
                            {sliceit == slice.length ? <Button className={classes.loadmore} onClick={loadmore}>
                                    Load More
                                </Button> : console.log("Nothing more to load")}
                        </div>
                    )
 }               
                            return(
                                    <div>

                                           {console.log("Loading")}
                                    </div>
                                )
                               
                            
}