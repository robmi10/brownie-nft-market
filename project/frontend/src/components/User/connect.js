import {makeStyles, Paper, Button } from '@material-ui/core'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import coinbase from "../../components/Design/Images/Wallet/coinbase.png"
import fortmatic from "../../components/Design/Images/Wallet/fortmatic.png"
import metamask from "../../components/Design/Images/Wallet/metamask.png"
import walletconnect from "../../components/Design/Images/Wallet/walletconnect.png"
import {useEthers } from '@usedapp/core'
import {useContext} from 'react';
import {AccountContext} from "../../components/UseContext/Account_Context"
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
    paper2:{
        width: 400,
    }
})


export default function Connect(){
    const classes = useStyles()

    const {setAccount} = useContext(AccountContext)
    const {changeIcon, setchangeIcon} = useContext(AccountContext)
    const { activateBrowserWallet, deactivate, account, active} = useEthers()
    const isConnected = account !== undefined

    const check_bool = () =>{  
        setchangeIcon(true)
        setAccount(account)
    }  
    
    return(
        <div align="center">
            
            <div className={classes.paper2}>
            
            {isConnected ? <p className="h1_connect"> Disonnect your wallet. </p>: <p className="h1_connect"> Connect your wallet. </p>}
            <p className="format_color">Connect with one of our available wallet info providers or create a new one.</p>
            </div>
           
            <Fade in={changeIcon}  style={{ transformOrigin: '0 0 0' }}
                {...(changeIcon ? { timeout: 1000 } : {})}>
            <Paper className={classes.paper}>
            <List>
            <ListItemButton  onClick={() => { activateBrowserWallet();}}>
                <ListItemIcon>
                <img style = {{height: 40, width: 40}} src={metamask} />
                </ListItemIcon>
                <ListItemText primary="Metamask" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                <img style = {{height: 40, width: 40}} src={walletconnect} />
                </ListItemIcon>
                <ListItemText primary="Walletconnect" />
            </ListItemButton>


            <ListItemButton>
                <ListItemIcon>
                <img style = {{height: 35, width: 35}} src={fortmatic} />
                </ListItemIcon>
                <ListItemText primary="Fortmatic" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                <img style = {{height: 40, width: 40}} src={coinbase} />
                </ListItemIcon>
                <ListItemText primary="Coinbase" />
            </ListItemButton>


            {account ? <Button onClick={() =>{ deactivate()}} variant="contained" color = "primary"> Disconnect</Button> :  console.log("is Connected") }
            </List>


            </Paper>
            </Fade>
            {check_bool()}
        </div>
    )
}