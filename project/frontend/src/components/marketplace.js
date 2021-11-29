import "../App.scss"
import {makeStyles, CardContent, Grid, Button, Box, Typography } from '@material-ui/core'
import * as React from 'react';
import Auctionmarket from "./auctionmarket"
import Sellmarketplace from "./sellmarket"
import {useState, useContext, useEffect} from 'react';
import {AccountContext} from "../components/UseContext/Account_Context"
import All_nft from "./User/all_nfts";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },

    margin:{
        marginTop: 30,
    },

    box: {
        background: "rgb(255, 255, 255)",
        width: 300,
        height: 350,
        borderRadius: 30,
   
        marginTop: 20,
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
})

export default function Marketplace(){
    const classes = useStyles();
    const {filter_nft, setFilter_nft} = useContext(AccountContext)
    const {sellmarketloading, setSellmarketloading} = useContext(AccountContext)

    return(
        <div align="center" className="App">

            {console.log("filter list", filter_nft)}
    

            <Sellmarketplace></Sellmarketplace>
            <Auctionmarket/>
          
        </div>
    )
}