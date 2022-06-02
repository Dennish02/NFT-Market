import {
  ALL_NFT_MARKET,
  VALIDATE_USER,
  RESET_PASSWORD,
  RESET_ERROR,
  LOGIN_USER,
  SEND_EMAIL_TO_RESET_PASSWORD,
  RESET_ERROR_LOGUIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  SEARCH_NFT,
  USER_NFT,
  CREATE_NFT,
  RESET,
  SET_COLECCIONES,
  SHOW_USERS_ID,
  SAVE_VALUE,
  ACTUAL,
  FILTER_COLECTION,
  TRANSFERIR_CL,
  RANKING_PORTFOLIOS,
  SORT,
  LOAD_COLECCIONES,
  GOOGLE_LOGIN,
  SORT_POP,
  GUARDAR_PAGINA,
  TRADE_OFFER,
  SEE_OFFER,
  RESPONSE_OFFER,
  NOTIFICATION_USER,
  NOTIFICATION_USER_TRUE,
  CANCEL_OFFER,
  DELETE_OFFER,
  LIKE_FAVORITE,
  CAMBIAR_VENTA,
  FILTER_CATEGORY
} from "../constantes";

const initialState = {
  allNft: [],
  backUpAllNft: [],
  nftUser: [],
  backUpNftUser: [],
  usuario: [],
  usuarioActual: [],
  allUsuarios: [],
  confirmacion: {},
  errorEmail: [],
  invalidToken: true,
  loginUser: false,
  creado: false,
  colecciones: [],
  usersInfo: [],
  valor: [],
  ranking: [],
  likeNft: [],
  transferencias: [],
  trades: [],
  notification: [],
  ordenamiento: "sort",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_NFT_MARKET:
      return {
        ...state,
        allNft: action.payload.nftAlldb,
        backUpAllNft: action.payload.nftAlldb,
      };

    case CREATE_NFT:
      return {
        ...state,
        creado: true,
      };

    case RESET:
      return {
        ...state,
        creado: false,
      };

    case SET_COLECCIONES:
      return {
        ...state,
        colecciones: action.payload,
      };

    case CAMBIAR_VENTA:
      const newNftUser = state.nftUser.map((e) =>
        e._id === action.payload ? { ...e, avaliable: !e.avaliable } : e
      );
      return {
        ...state,
        nftUser: newNftUser,
      };

    case LOAD_COLECCIONES:
      return {
        ...state,
      };

    case USER_NFT:
      return {
        ...state,
        nftUser: action.payload,
        backUpNftUser: action.payload,
      };

    case ACTUAL:
      return {
        ...state,
        usuarioActual: action.payload,
      };

    case GOOGLE_LOGIN:
      return {
        ...state,
        usuario: action.payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        usuario: !action.payload.error ? action.payload : null,
        errorEmail: action.payload.error ? action.payload.error : null,
        loginUser: action.payload._id && true,
      };

    case LOGOUT_USER:
      return {
        allNft: [],
        backUpAllNft: [],
        nftUser: [],
        backUpNftUser: [],
        usuario: [],
        usuarioActual: [],
        allUsuarios: [],
        confirmacion: {},
        errorEmail: [],
        invalidToken: true,
        loginUser: false,
        creado: false,
        colecciones: [],
        usersInfo: [],
        valor: [],
        ranking: [],
        likeNft: [],
        transferencias: [],
        trades: [],
        allNftFlag: true,
      };

    case AUTH_USER:
      return {
        ...state,
        usuario: action.payload,
      };

    case RESET_ERROR_LOGUIN_USER:
      return {
        ...state,
        errorEmail: action.payload,
      };

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
      return {
        ...state,
        errorEmail: action.payload,
      };

    case RESET_ERROR:
      return {
        ...state,
        errorEmail: [],
      };

    case SEARCH_NFT:
      if (!action.payload) {
        return {
          ...state,
          allNft: state.backUpAllNft,
        };
      }
      let getNFT = state.backUpAllNft;
      let filterBySearch = getNFT.filter((el) =>
        el.id.toUpperCase().includes(action.payload.toUpperCase())
      );
      return {
        ...state,
        allNft: filterBySearch,
      };

    case SHOW_USERS_ID:
      return {
        ...state,
        usersInfo: action.payload,
      };

    case SAVE_VALUE:
      return {
        ...state,
      };

    case FILTER_COLECTION:
      if (action.payload === "todos") {
        return {
          ...state,
          nftUser: state.backUpNftUser,
        };
      }
      const nftForFilter = state.backUpNftUser;
      let filter = [];
      if (action.payload === "comprados") {
        const cols = state.colecciones.map((e) => e.name);
        filter = nftForFilter.filter((el) => !cols.includes(el.colection));
      } else {
        filter = nftForFilter.filter((el) => el.colection === action.payload);
      }
      return {
        ...state,
        nftUser: filter,
      };

    case SAVE_VALUE:
      return {
        ...state,
      };

    case TRANSFERIR_CL:
      return {
        ...state,
      };

    case RANKING_PORTFOLIOS:
      return {
        ...state,
        ranking: action.payload,
      };

    case SORT:
      //comentario para poder comitear
      const allNft = state.allNft.sort((a, b) => {
        if (action.payload === "price_asc") {
          return a.price - b.price;
        } else if (action.payload === "price_desc") {
          return b.price - a.price;
        } else if (action.payload === "ranking_asc") {
          return a.ranking - b.ranking;
        } else if (action.payload === "ranking_desc") {
          return b.ranking - a.ranking;
        }
      });
      return {
        ...state,
        allNft,
      };

    case LIKE_FAVORITE:
      const newNfts = state.allNft.map((e) => {
        if (e._id === action.payload._id) {
          e = action.payload;
          return e;
        } else return e;
      });
      return {
        ...state,
        allNft: newNfts,
       
      };

    case SORT_POP:
      let nftForSort =
        action.payload == "high"
          ? state.allNft.sort((a, b) => {
              return b.ranking - a.ranking;
            })
          : action.payload == "low"
          ? state.allNft.sort((a, b) => {
              return a.ranking - b.ranking;
            })
          : state.backUpAllNft;
      let auxiliar = nftForSort.map((el) => el);
      return {
        ...state,
        allNFT: auxiliar,
      };

    case GUARDAR_PAGINA:
      return {
        ...state,
        homeGuardado: {
          ...state.homeGuardado,
          pagina: action.payload,
        },
      };

    case TRADE_OFFER:
      return {
        ...state,
        trades: [...trades, action.payload],
      };

    case SEE_OFFER:
      return {
        ...state,
        trades: action.payload,
      };

    case RESPONSE_OFFER:
      return {
        ...state,
      };

    case CANCEL_OFFER:
      return {
        ...state,
      };

    case DELETE_OFFER:
      return {
        ...state,
      };

    case NOTIFICATION_USER:
      return {
        ...state,
        notification: action.payload,
      };

    case NOTIFICATION_USER_TRUE:
      return {
        ...state,
      };
      case FILTER_CATEGORY:
        
        return{
          ...state,
          allNft : action.payload
        }
    default:
      return state;
  }
}
export default rootReducer;
