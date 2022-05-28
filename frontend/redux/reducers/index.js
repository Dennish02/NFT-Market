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
  EDIT_NFT_PRICE,
  CREATE_NFT,
  RESET,
  SET_COLECCIONES,
  GIFT_NFT,
  SHOW_USERS_ID,
  SAVE_VALUE,
  ACTUAL,
  FILTER_COLECTION,
  TRANSFERIR_CL,
  RANKING_PORTFOLIOS,
  LIKE_NFT,
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
  ordenamiento: 'sort'
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_NFT_MARKET:
      var {nftAlldb} = action.payload
      console.log(state.ordenamiento)
      var {ordenamiento} = state
      // if(state.ordenamiento === 'price_desc'){
        nftAlldb = nftAlldb.sort((a, b) => {
          if (ordenamiento === "price_asc") {
            return a.price - b.price;
          } else if (ordenamiento === "price_desc") {
            return b.price - a.price;
          } else if (ordenamiento === "ranking_asc") {
            return a.ranking - b.ranking;
          } else if (ordenamiento === "ranking_desc") {
            return b.ranking - a.ranking;
          } else {
            return 0
          }
        });
        console.log(nftAlldb)
  
      // }
      if (state.allNft.length === state.backUpAllNft.length) {
        return {
          ...state,
          allNft: nftAlldb,
          backUpAllNft: nftAlldb
          // allNft: action.payload.nftAlldb,
          // backUpAllNft: action.payload.nftAlldb,
          //usuario: action.payload.usuario,
        };
      }
      return {
        ...state,
        backUpAllNft: nftAlldb
        // backUpAllNft: action.payload.nftAlldb,
        //usuario: action.payload.usuario,
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
        // colecciones: [],
      };

    case SET_COLECCIONES:
      return {
        ...state,
        colecciones: action.payload,
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
      const backUpAllNft = state.backUpAllNft.sort((a, b) => {
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
      // let aux = NFTOrdenados.map(el => el)
      return {
        ...state,
        allNft,
        backUpAllNft,
        ordenamiento: action.payload
      };

    case LIKE_NFT:
      const like = action.payload.msg
        ? { msg: action.payload.msg, like: true }
        : { msg: action.payload.alert, like: false };
      return {
        ...state,
        likeNft: like,
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

      }
    case SEE_OFFER:
      return {
        ...state,
        trades: action.payload,

      }
    case RESPONSE_OFFER:
        return {
          ...state
      }
    case CANCEL_OFFER: 
      return {
        ...state
      }
    case NOTIFICATION_USER:
      return {
        ...state,
        notification: action.payload,
      };
    case NOTIFICATION_USER_TRUE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default rootReducer;
