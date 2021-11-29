import {createTheme, makeStyles, IconButton, Paper, Button } from '@material-ui/core'
import auction from "../../components/Design/Images/auction.png"
import sell from "../../components/Design/Images/sell.png"
import {useEthers } from '@usedapp/core'
import {useState, useContext} from 'react';
import {AccountContext} from "../../components/UseContext/Account_Context"
import Create_nft_auction from './transactions/create_auction';
import Create_nft_sell from './transactions/create_sell';
import Fade from '@mui/material/Fade';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    
    paper:{
        background: "rgb(253, 253, 253)",
        boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
        borderRadius: 0,
        height: 250,
        width: 400,
        padding: 20,
        justifyContent:"center",
    },
    float_right:{
        height: 100,
        width: 200,
        float: "left"
    },
    float_left:{
        height: 100,
        width: 200,
        float: 'right'
    }
})


export default function Create(){
    const classes = useStyles()
    const {setAuction} = useContext(AccountContext)
    const {setSell} = useContext(AccountContext)
    const { activateBrowserWallet, deactivate, account, active} = useEthers()
  
    return(
        <div align="center">
           
        <Fade in={setSell}  style={{ transformOrigin: '0 0 0' }}
                {...(setSell ? { timeout: 1000 } : {})}>
            <Paper className={classes.paper}>
            <p className="format_color">Put it on auction or sell it directly</p>
                <div style={{  marginTop: 50}}>
                        <div className={classes.float_left}>
                        <img style = {{height: 80, width: 80}} src={sell} />
                        </div>
                        <Button onClick={() =>{setAuction(true)}} style ={{position: 'absolute', left: 500, top: 350}} color="primary" variant ="contained">
                        Auction
                        </Button>


                        <div className={classes.float_right}>
                        <img style = {{height: 80, width: 80}} src={auction} />
                        </div>
                        <Button onClick={() =>{ setSell(true)}} style ={{position: 'absolute', left: 700, top: 350}} color="primary"  variant ="contained"> 
                        Sell
                        </Button>

                </div>

            </Paper>

            </Fade>

            {Create_nft_auction()}

            {Create_nft_sell()}

        </div>
    )
}