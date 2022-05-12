
import { ALL_NFT_MARKET,
   VALIDATE_USER, 
   RESET_PASSWORD, 
   RESET_ERROR, 
   LOGUIN_USER,
   SEND_EMAIL_TO_RESET_PASSWORD,
   RESET_ERROR_LOGUIN_USER, SEARCH_NFT } from "../constantes";


const initialState = {
  allNft: [],
  backUpAllNft: [],
  nftUser: [],
  backUpNftUser: [],
  usuario: [],
  allUsuarios: [],
  confirmacion:{},
  errorEmail:[],
  invalidToken:true,
 
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
        //console.log(action.payload)
      return {
        ...state, 
        usuario: action.payload 
      }
    case RESET_ERROR_LOGUIN_USER:

      return {
        ...state,
        usuario: action.payload
      } 
      case VALIDATE_USER:
        return {
          ...state,
          confirmacion: action.payload,
        };
        case SEND_EMAIL_TO_RESET_PASSWORD:
          return {
            ...state,
            errorEmail: action.payload,
        };
        
        case RESET_PASSWORD:
          console.log(action.payload.error)
          return {
            ...state,
            errorEmail: action.payload,
        };
        case RESET_ERROR:
          return {
            ...state,
            errorEmail: [],
        };    
      case  SEARCH_NFT:
        //logic reducer
        let nftSearch = state.backUpAllNft
        let filterBySearch = nftSearch.filter(el => el.id.toUpperCase().includes(action.payload.toUpperCase()))
       
        
        // let wewe = filterByQuery.includes(action.payload)? console.log('si') : console.log('no')
        
        return {

          ...state,
          allNft : filterBySearch
        }

    default:
      return state;
  }
}
export default rootReducer;
