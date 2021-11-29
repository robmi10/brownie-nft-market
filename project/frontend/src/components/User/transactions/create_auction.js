import {createTheme, Dialog, FormControl, Paper, Button, TextField } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {useState, useContext, useEffect} from 'react';
import "../../../App.scss"
import {utils} from "ethers"
import {useContractFunction, useEthers, useNotifications} from '@usedapp/core'
import {Contract} from "@ethersproject/contracts"
import { AccountContext } from '../../UseContext/Account_Context';
import {AUCTION_CONTRACT_ADRESS} from "../../config"
import Auction_contract from "../../../chain-info/contracts/Auction_nft.json"
import ipfs from "../../ipfs"
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const royaltie_list= [{value: 0}, {value: 2}, {value:5}, {value: 10}, {value: 20}, {value: 30}, {value: 40}, {value: 50}]

const unit= [{value: 'ETH'}, {value: 'USD'}, {value:'SEK'}]

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
    
    paper:{
        background: "rgb(253, 253, 253)",
        boxShadow: '0 3px 5px 2px rgba(83, 110, 233)',
        borderRadius: 2,
        height: 480,
        padding: 20,

        width: 400,
        position: 'relative',
                 left: 0,
                 top: 0,
                 cursor: 'pointer',
    },

    paper2:{
        borderRadius: 2,
        height: 1200,
        padding: 20,

        width: 400,
   
    },
    
});

const theme = createTheme ({
    palette:{
        primary:{
            main: '#ffa724'
        }
    }
})


export default function Create_nft_sell(){
const classes = useStyles();
const [open, setOpen] = useState(false);
const [royalty, setRoyalty] = useState("");
const [title, setTitle] = useState();
const [description, setDescription] = useState();
const [copies, setCopies] = useState();
const {auction, setAuction} = useContext(AccountContext)

const {notifications} = useNotifications()

const [price, setPrice] = useState();

const [ipfsHash, setIpfsHash] = useState();
const [metadata_ipfsHash, setmetadata_ipfsHash] = useState();
const [image, setImage] = useState();

const [buffer, setBuffer] = useState();
const [MP4Image, setMP4Image] = useState(false);

const [newrender, setNewrender] = useState();

const [_newImage, set_newImage] = useState();

const {account_address} = useContext(AccountContext)

const {account, chainId} = useEthers()

const [create_nft_state, setCreate_nftstate] = useState(false)

const [error, setError] = useState(false)

const {abi} = Auction_contract;

const AuctionInterface = new utils.Interface(abi)
const AUCTIONContract = new Contract(AUCTION_CONTRACT_ADRESS, AuctionInterface)

const {send: start_auction, state: create_auctionstate} = 
useContractFunction(AUCTIONContract, "start_auction", 
{ transactionName: 'Auction is created' }) 

const handleOpen = () =>{
    setOpen(true);
}

const handleClose = () =>{
    setAuction(false);
}

const handleRoyalty = (e) =>{
    setRoyalty(e.target.value);
}

const handleTitle = (e) =>{
    setTitle(e.target.value);
}

const handleDescription = (e) =>{
    setDescription(e.target.value);
}

const handleCopies = (e) =>{
    setCopies(e.target.value);
}

const handlePrice = (e) =>{
    setPrice(e.target.value);
}

const handleImage = (e) =>{
    
    console.log("image ->", e.target)

    console.log("image value->", e.target.value)
    var file = e.target.value
    if(file.substr(file.length - 3) == "mp4"){
        console.log("Its a mp4 file")
        setMP4Image(true)
    }
    setImage(e.target);
}


const handleCloseAlert = () =>{
    setCreate_nftstate(false)
    
}

const handleCloseAlerterror = () =>{
    setError(false)
    
}



const handleCopy = (e) =>{

    var date = new Date(e.target.value)
    var ms = date.getTime()
    console.log("date --->", e.target.value)
    console.log("date to ms --->", ms)
    setCopies(ms);
}

const load_blockchain =(token_uri) =>{
    console.log("inside blockchain metadata =>", token_uri)
    start_auction(account_address, copies, token_uri.toString())
}

const isMining = create_auctionstate.status === "Mining"

useEffect(() => {
    console.log("Image is changed->", _newImage)
    console.log("inside useffect")

    console.log("create_auctionstate.status->", create_auctionstate.status)

    if(create_auctionstate.status === "Success"){
        console.log("inside useffect 2")
        setNewrender(false)
        setCreate_nftstate(true)
    }

    if(create_auctionstate.status === "Exception"){

        console.log("inside useffect set error")
        setError(true)
        
    }

    if(_newImage !== undefined && create_auctionstate.status === "None"){
        console.log("inside useffect 3")
        setNewrender(true)
        handle_Metadata()
    }
    
}, [_newImage, notifications, create_auctionstate])

const handleFile = (e) =>{
    const name = "C:\fakepath\silva_belfort_kick-610x406.jpg"
    console.log("image to files:", image.files[0] )

    var reader = new window.FileReader();
    reader.readAsArrayBuffer(image.files[0]);
    reader.onloadend = () =>{
        console.log("reader.result -->", reader.result)
      setBuffer(Buffer(reader.result))
      console.log("Buffer(reader.result) -->", Buffer(reader.result))
      console.log("buffer--->", buffer)
        
      ipfs.files.add(Buffer(reader.result), (error, result) => {

        console.log("result ->", result)
        console.log("result[0].hash ->", result[0].hash)
        set_newImage(result[0].hash)
        console.log("image inside result hash->", _newImage)         
        }
    )}
    
}

const handle_Metadata = (e) =>{
    const curr_image = `https://ipfs.io/ipfs/${_newImage}`
    const new_image = JSON.stringify(curr_image)
    console.log("inside handle_metadata image->", image)
    const metadata = {
        "title": title,
        "description": description,
        "price": price,
        "royalty": royalty,
        "Copies": copies,
        "image": new_image,
        "image_format": MP4Image
    }

        ipfs.files.add(Buffer.from(JSON.stringify(metadata)))
        .then(res => {
            console.log("res--->", res)
            console.log("new_image ->", res[0].hash)

            const curr_metadata = "https://ipfs.io/ipfs/" + res[0].hash
            console.log("curr_metadata->", curr_metadata)

            load_blockchain(curr_metadata)
        })
        .then(output => {
            console.log('retrieved data', output)
         
        })
}

return(
    <div className="App">
        
    <Dialog open={auction}>
    <Paper className={classes.paper2}>
        <h2>Create NFT Auction</h2>
        <p>Upload your file</p>

            <TextField 
                variant="outlined"
                margin="normal"
                required 
                fullWidth 
                type = "file"
                autoFocus 
                onChange={handleImage}
            />    

        <TextField        
        id="text"
        required 
        fullWidth 
        variant="outlined"
        label="Title"
        onChange={handleTitle}
        />

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <TextField
      id="Royalties"
      select
      label="Select Royalty"
      required 
      fullWidth 
      variant="outlined"
      value={royalty}
      onChange={handleRoyalty}
      SelectProps={{
        native: true,
      }}
      helperText="Please select your royalty"
    >
         {royaltie_list.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value} %
        </option>
      ))}
      </TextField>
        </FormControl>  

        <TextField           
        id="text"
        variant="outlined"
        label="Number of copies"
        onChange={handleCopies}
        />

        <TextField           
        id="text"
        variant="outlined"
        label="Price"
        onChange={handlePrice}
        />

<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <TextField
      id="Royalties"
      select
      label="Currency"
      required 
      fullWidth 
      variant="outlined"
      value={royalty}
      onChange={handleRoyalty}
      SelectProps={{
        native: true,
      }}
      helperText="Select Price"
    >
         {unit.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
      </TextField>
        </FormControl>

         <TextField           
        id="text"
        required 
        fullWidth 
        label="e. g. After buying you will get a signed shirt"
        variant="outlined"
        onChange={handleDescription}
        />

        <TextField           
            id="text"
            required 
            fullWidth 
            variant="outlined"
            type="date"
            onChange={handleCopy}
            />

        <Button onClick={() =>{{image == undefined ? setError(true) :  handleFile();} handleClose();}} variant="contained" style ={{top: 120}} color ="primary"> Create item</Button>
        <Button variant="contained" style ={{top: 120}} color ="primary" onClick={handleClose}> Cancel</Button>

    </Paper>

    </Dialog>

        <Snackbar
        open={create_nft_state} autoHideDuration={6000} onClose={handleCloseAlert}
        >
            <Alert severity="success">Auction has started!</Alert>
        </Snackbar>

        <Snackbar
        open={error} autoHideDuration={6000} onClose={handleCloseAlerterror}
        >
            <Alert severity="error">Error Appeared!</Alert>
        </Snackbar>
            
</div>
)
}