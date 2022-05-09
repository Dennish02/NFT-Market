import { ALL_NFT_MARKET  } from '../constantes' 

const initialState ={
    allNft:[],
    backUpAllNft:[],
    nftUser:[],
    backUpNftUser:[],

}

function rootReducer (state= initialState, action){

        switch(action.type){
           
            case ALL_NFT_MARKET:
                console.log('action.payload')
                return {
                    ...state,
                    allNft: action.payload,
                    backUpAllNft: action.payload
                }
            default:
              return  state;
        }

}
export default rootReducer;