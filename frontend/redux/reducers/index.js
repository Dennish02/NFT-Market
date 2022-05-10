import { ALL_NFT_MARKET, LOGUIN_USER } from "../constantes";

const initialState = {
  allNft: [],
  backUpAllNft: [],
  nftUser: [],
  backUpNftUser: [],
  usuario: [],
  allUsuarios: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_NFT_MARKET:
      return {
        ...state,
        allNft: action.payload,
        backUpAllNft: action.payload,
      };
    case LOGUIN_USER: 

      return {
        ...state, 
        usuario: action.payload
      }
    default:
      return state;
  }
}
export default rootReducer;
