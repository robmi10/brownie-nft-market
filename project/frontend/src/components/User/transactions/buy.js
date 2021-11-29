import {createTheme, Dialog, Tab, DialogTitle, Typography, Paper, Button, Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {useState, useContext, useEffect} from 'react';
import {AccountContext} from "../../../components/UseContext/Account_Context"
import {TabContext, TabList, TabPanel, Timeline, 
    TimelineItem, TimelineOppositeContent,
     TimelineConnector, TimelineSeparator, TimelineDot, TimelineContent} from '@material-ui/lab';
import {AccountCircle} from '@material-ui/icons'
import List from '@mui/material/List';
import {VideoBg} from "../../../components/Design/design" 
import "../../../App.scss"
import {utils} from "ethers"
import {useContractFunction, useEthers, useNotifications} from '@usedapp/core'
import {Contract} from "@ethersproject/contracts"
import Nft_contract from "../../../chain-info/contracts/NFT.json"
import {NFT_CONTRACT_ADRESS} from "../../config"
import {Link} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    dialog:{
        cursor: 'cursor'
      
    },
    
    paper:{
        background: "rgb(253, 253, 253)",
        boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
        borderRadius: 0,
        height: 600,
        width: 400,
        padding: 20,
        justifyContent:"center",
        position: 'relative',
                 left: 0,
                 top: 0,
                 cursor: 'pointer',
    },
});

const theme = createTheme ({
    palette:{
        primary:{
            main: '#ffa724'
        }
    }
})


export default function Buy({nfts, address, index, price}){
const classes = useStyles()
const {buystate, setBuystate} = useContext(AccountContext)
const {account_address} = useContext(AccountContext)

const [value, setValue] = useState(0)
const [tooglepic, setPic] = useState()

const {account, chainId} = useEthers()

const [create_nft_state, setCreate_nftstate] = useState(false)

const {notifications} = useNotifications()

const [error, setError] = useState(false)

const {abi} = Nft_contract;

const NftInterface = new utils.Interface(abi)
const NFTContract = new Contract(NFT_CONTRACT_ADRESS, NftInterface)

const {send: transfer_nft, state: create_nftstate} = 
useContractFunction(NFTContract, "transfer_nft", 
{ transactionName: 'Nft is created' }) 


console.log("BUY NFTS ->", nfts)

console.log("Current address  ->", address)

console.log("Current index  ->", index)

const handle_pic = (e, value) =>{
    setPic(false)
    setValue(0)
}

const handle_func = (e, value) =>{
    setPic(true)
    setValue(value)
}

const buy_blockchain = () =>{
    console.log("Inside buy blockchain")
    
    transfer_nft(account_address, index, {value: utils.parseEther(price)})
}

const handle_image_format = () =>{
    if(nfts.image_format){
    return(
        tooglepic ? <VideoBg  onClick={handle_pic} style={{height: 100, width: 100, borderRadius: 10}} autoPlay loop muted src={nfts.image.replace(/['"]+/g, '')} type='video/mp4'></VideoBg> : <VideoBg  style={{height: 370, width: 380, borderRadius: 10}} autoPlay loop muted src={nfts.image.replace(/['"]+/g, '')} type='video/mp4'></VideoBg>
        
    )}
    else{
        return(
            tooglepic ? <img onClick={handle_pic} style={{height: 100, width: 100, borderRadius: 10}} src={nfts.image.replace(/['"]+/g, '')}></img> : <img style={{height: 370, width: 380, borderRadius: 10, left: 10}} src={nfts.image.replace(/['"]+/g, '')}></img>
        )
    }
}

useEffect(() => {
    if(create_nftstate.status === "Success"){
        console.log("inside useffect 2")
        
        setCreate_nftstate(true)
    }

    if(create_nftstate.status === "Exception"){
        console.log("inside useffect 3")
        
        setError(true)
    }
    
}, [notifications, create_nftstate])


const handleCloseAlert = () =>{
    setCreate_nftstate(false)
    
}


const handleCloseAlerterror = () =>{
    setError(false)
}

console.log("")
console.log("inside buy -->",)
return(
    <div>
        <Dialog className={classes.dialog} open={buystate}>


            <Paper className={classes.paper} >

                {handle_image_format()}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    
                        <TabContext value={value}>
                            
                            <TabList onChange={handle_func} aria-label ="Menu">
                            
                            <Tab  label ="Owner" value={1} className={classes.text}></Tab>

                            <Tab label ="Info" value={2} className={classes.text}></Tab>

                            
                            </TabList>
                                    <TabPanel onChange={handle_pic}
                                    value={0} >  
                                       <DialogTitle>
                               
                                        
                                    </DialogTitle>    
                                    </TabPanel>
                                   
                                        <TabPanel onChange={handle_pic}
                                        value={1} >  
                                    <div align="center">                               
                                    
                                    <Typography  component="div" variant="h5">
                                        Owner
                                        </Typography>

                                        <Button component={Link} to={"/profile/"}>
                                        <AccountCircle className="format_color" />
                                        </Button>
            
                                        <Typography  className="format_color" variant="subtitle1" color="text.secondary" component="div">
                                        {address.substr(0, 35)}

                                        </Typography>
                                        </div> 
                                    <div style={{marginTop: 20}}align="center">  
                                        <Typography  component="div" variant="h5">
                                        Description
                                        </Typography>
                                   
                                        <Typography className="format_color" variant="subtitle1" color="text.secondary" component="div">
                                        {nfts.description}
                                        </Typography> 
                                    </div>                      

                                    </TabPanel> 

                                  

                                    <TabPanel onChange={handle_pic}
                                    value={2} >

                                    <Typography component="div" variant="h5">
                                    History
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                    All transactions
                                    </Typography>

                            <List  sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 200,
                                    '& ul': { padding: 0 },
                                }}>
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
                                                Transaction
                                            </Typography>
                                            <Typography>To owner 0x4234</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>

                                    <Timeline position="alternate">
                                
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
                                                Transaction
                                            </Typography>
                                            <Typography>To owner 0x4234</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                    <Timeline position="alternate">
                                
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
                                                Transaction
                                            </Typography>
                                            <Typography>To owner 0x4234</Typography>
                                            </TimelineContent>
                                        </TimelineItem>

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
                                                Transaction
                                            </Typography>
                                            <Typography>To owner 0x4234</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                    <Timeline position="alternate">
                                
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
                                                Transaction
                                            </Typography>
                                            <Typography>To owner 0x4234</Typography>
                                            </TimelineContent>
                                        </TimelineItem>

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
                                                Transaction
                                            </Typography>
                                            <Typography>To owner 0x4234</Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                         </List>
                                    </TabPanel> 
                            
                    </TabContext>
                </Grid>

            

                <h1 className="format_color" style ={{position: 'absolute', left: 80, top: 480}}>
                                        {nfts.price} ETH
                </h1>


                <Button  style ={{position: 'absolute', left: 320, top: 480}} variant= "contained" color="primary" onClick={() =>{
                     buy_blockchain()
                }}>
                    Buy
                </Button>

                <Button style ={{position: 'absolute', left: 210, top: 480}} variant= "contained" color="primary" onClick={() =>{
                    setBuystate(false)
                }}>
                    Cancel
                </Button>
            </Paper>

        </Dialog>

        <Snackbar
            open={create_nft_state} autoHideDuration={6000} onClose={handleCloseAlert}
            >
                <Alert severity="success">Buy is created!</Alert>
            </Snackbar>
                
        <Snackbar
            open={error} autoHideDuration={6000} onClose={handleCloseAlerterror}
            >
                <Alert severity="error">Error Appeared!</Alert>
        </Snackbar>
    </div>
)
}