import axios from "axios";


export function allNftMarket(){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/api/nft/");
            return dispatch({
                type: 'ALL_NFT_MARKET',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
       
    }
}


export function nftWithUser(){
    
}