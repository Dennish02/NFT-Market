import axios from "axios";
import clienteAxios from "../../src/config/clienteAxios";

import {
  CREATE_NFT,
  EDIT_NFT_PRICE,
  GIFT_NFT,
  BUY_NFT,
  EDIT_NFT,
  SEARCH_NFT,
  USER_NFT,
  ALL_NFT_MARKET,
} from "../constantes/index";

export function allNftMarket() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      var json = await clienteAxios.get(`/nft/`, config);

      return dispatch({
        type: ALL_NFT_MARKET,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function userNfts(name) {
  return async function (dispatch) {
    return dispatch({
      type: USER_NFT,
      payload: name,
    });
  };
}

export function crearNFT(payload) {
  return async function (dispatch) {
    const body = {
      category: payload.category,
      colection: payload.colection,
      price: Number(payload.price),
      image: payload.image,
    };
    const id = payload.id;

    const form = new FormData();
    for (let key in body) {
      form.append(key, body[key]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    };

    let json = await clienteAxios.post(`/nft`, form, config);
    return dispatch({
      type: CREATE_NFT,
      payload: json.data,
    });
  };
}

// export function nftWithUser() {
//   return async function(dispatch){
//     const token = localStorage.getItem('token')

//     if(!token){return }

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//       let json= await clienteAxios.get(`/nft/portfolio`, config)
//     return dispatch({
//       type: NFT_USER,
//       payload: json.data
//     })
//   }
// }

export function nftWithUser() { }

export function comprarNFT(payload) {
  return async function () {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    await clienteAxios.post(`/nft/comprar/${payload}`, {}, config);
  };
}

export function venta(payload) {
  return async function () {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const json = await clienteAxios.put(`nft/vender/${payload}`, {}, config);
      return json.data;
    } catch (e) {
      console.log(e);
    }
  };
}

export function SearchNFT(payload) {
  return {
    type: SEARCH_NFT,
    payload,
  };
}

export function Edit_NFT(_id, payload) {
  return async function (dispatch){

  const token = localStorage.getItem("token");


   const authAxios = axios.create({
     headers:{
      Authorization: `Bearer ${token}`
     }
   })


    const json = await authAxios.put(`${import.meta.env.VITE_BACKEND_URL}/api/nft/${_id}`, {price: payload})
    return dispatch({
      type: EDIT_NFT_PRICE,
      payload,
    })
  }

  
}
