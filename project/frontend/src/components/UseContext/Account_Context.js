import { createContext } from "react";
import { useState } from "react";

export const AccountContext = createContext();

export const AccountProvider = ({children}) =>{
    const [account_address, setAccount] = useState('')

    const [token_list, setTokenList] = useState()

    const [buystate, setBuystate] = useState()

    const [bidstate, setBidstate] = useState()

    const [auction, setAuction] = useState()

    const [sell, setSell] = useState()

    const [filter_nft, setFilter_nft] = useState()

    const [changeIcon, setchangeIcon] = useState(false)

    const [searchinput, setSearchinput] = useState("")

    const [sellmarketloading, setSellmarketloading] = useState()

    const [auctionmarketloading, setAuctionmarketloading] = useState()
    
    return(
        <AccountContext.Provider value ={{account_address, setAccount, token_list, setTokenList, 
        buystate, setBuystate, auction, setAuction, sell, setSell, bidstate, setBidstate, filter_nft, setFilter_nft,
        changeIcon, setchangeIcon, searchinput, setSearchinput, sellmarketloading, setSellmarketloading, auctionmarketloading, setAuctionmarketloading}}>
            {children}
        </AccountContext.Provider>
    )
}