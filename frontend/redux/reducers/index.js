
import { ALL_NFT_MARKET,
   VALIDATE_USER, 
   RESET_PASSWORD, 
   RESET_ERROR, 
   LOGUIN_USER,
   SEND_EMAIL_TO_RESET_PASSWORD,
   RESET_ERROR_LOGUIN_USER } from "../constantes";


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
        console.log(action.payload)
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
        

    default:
      return state;
  }
}
export default rootReducer;
