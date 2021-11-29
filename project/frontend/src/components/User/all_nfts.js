import {AccountContext} from "../../components/UseContext/Account_Context"
import {NFT_CONTRACT_ADRESS} from "../config"
import {useState, useContext, useEffect} from 'react';
import * as React from 'react';
import {useContractCall} from '@usedapp/core'
import {utils} from "ethers"
import Nft_contract from "../../chain-info/contracts/NFT.json"
import {makeStyles, styled, alpha } from '@material-ui/core/styles';
import {InputBase} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Sellmarketplace from "../sellmarket";
import {Contract} from "@ethersproject/contracts"


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  

export default function All_nft (){
    const [nfts_acc, setNfts_acc] = React.useState([])
    const {filter_nft, setFilter_nft} = useContext(AccountContext)
    const [render, setRender] = useState(false);
    const [search_input, setSearch_input] = useState();
    const [_render, set_Render] = useState();

    const [firstrender, setFirstrender] = useState(false);
    const {account_address} = useContext(AccountContext)
    const {abi} = Nft_contract;
    const NftInterface = new utils.Interface(abi)
    const NFTContract = new Contract(NFT_CONTRACT_ADRESS, NftInterface)
    const {searchinput} = useContext(AccountContext)

  
    
    const All_NFTS =
        useContractCall({
          abi: NftInterface,
          address: NFT_CONTRACT_ADRESS,
          method: "get_all_nfts",
          args: [],
        }) 
    console.log("All_NFTS inside sellmarket->", All_NFTS)

    if(All_NFTS != undefined){
        setRender(true)
    }

useEffect (() =>{
    if(All_NFTS != undefined){
        
        const list = []
        All_NFTS[0].map((nfts, i) =>{
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

                                if(searchinput !== null){
                                    const newFilterList = list.filter((val) =>{
                                        return Object.values(val)
                                        .join(" ").toLowerCase()
                                        .includes(searchinput.toLowerCase())
                                    })
                                    
                                    setNfts_acc(newFilterList)
                                }
                                else{
                                    
                                    setNfts_acc(list)
                                }
                               
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
    

    }, [searchinput])


    const handle_list = (list) =>{
        console.log("list inside handle--->", list)
        setNfts_acc(list)
    }
    
    return(
                <div>   
                    
                </div>
        )
    
}