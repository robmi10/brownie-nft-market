import * as React from 'react';
import {makeStyles, CardContent, Grid, Button, Box, Typography } from '@material-ui/core'
import Carousel from 'react-elastic-carousel';
import Nft_contract from "../../chain-info/contracts/NFT.json"
import {NFT_CONTRACT_ADRESS} from "../config"
import {utils} from "ethers"
import {useContractFunction, useEthers, useNotifications, useContractCall} from '@usedapp/core'
import {Contract} from "@ethersproject/contracts"
import {useState, useContext, useEffect} from 'react';
import {AccountContext} from "../../components/UseContext/Account_Context"
import {VideoBg} from "../../components/Design/design" 
import Auctiondashboard from './Auctiondashboard';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
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
        arginTop: 20
    },
    button:{
        marginTop: 20
    },
    box: {
        background: "rgb(255, 255, 255)",
        width: 420,
        height: 430,
      
   
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



export default function Selldashboard(){
    const [value, setvalue] = React.useState(0)
    const [render, setRender] = React.useState(0)
    const [nfts_acc, setNfts_acc] = React.useState([])
    const {account_address} = useContext(AccountContext)
    const {abi} = Nft_contract;
    const NftInterface = new utils.Interface(abi)
    const NFTContract = new Contract(NFT_CONTRACT_ADRESS, NftInterface)
   
    
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
   

                if(account_address === nfts["_user"]){
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


    console.log("nfts_acc -->", nfts_acc)
    if(nfts_acc.length > 0){
    return(
        <div align="center">    
       
        <Carousel  breakPoints={breakPoints} {...settings}>
               
        {nfts_acc.map((nfts, index) =>{

            {console.log("inside nfts acc mapping render --->", nfts_acc)}

            {console.log("inside nfts acc image --->", nfts.image.replace(/['"]+/g, ''))}
            if(nfts.image_format === true ){
            return(

                <Grow in={nfts.image_format}  style={{ transformOrigin: '0 0 0' }}
                {...(nfts.image_format ? { timeout: 1000 } : {})}>
                        <Box className={classes.box} >
                                    <CardContent sx={{ flex: '1 0 auto' }}>

                                    <VideoBg  style={{height: 315, width: 330, borderRadius: 10}} autoPlay loop muted src={nfts.image.replace(/['"]+/g, '')} type='video/mp4'></VideoBg>
                                    <p></p>
                
                                    <h1 className="h1_connect">{nfts.title}</h1>

                                    <p className="format_color"> {nfts.description}</p>
                                    </CardContent>
                                </Box>

                </Grow>
                    )}
                else{

                    return(

                        <Grow in={nfts.image_format == false}  style={{ transformOrigin: '0 0 0' }}
                                {...(nfts.image_format == false? { timeout: 1000 } : {})}>
                                    <Box className={classes.box} >
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                    <img style={{height: 315, width: 330, borderRadius: 10,}} src={nfts.image.replace(/['"]+/g, '')}></img>
                                        <p></p>
                            
                                        <h1 className="h1_connect">{nfts.title}</h1>

                                        <p className="format_color"> {nfts.description}</p>
                                    </CardContent>
                                </Box>
                            </Grow>

                    )


                }
        })}      
        </Carousel>     
        
        </div>
    )
}
    return(
        <div>

                <div className={classes.circular}>
                    <CircularProgress color="secondary" />
                </div>
                
        </div>
    )
}