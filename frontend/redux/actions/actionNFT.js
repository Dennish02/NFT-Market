import axios from "axios";
import clienteAxios from "../../src/config/clienteAxios";
import { useEffect } from "react";
import {
  CREATE_NFT,
  RESET,
  EDIT_NFT_PRICE,
  GIFT_NFT,
  BUY_NFT,
  EDIT_NFT,
  SEARCH_NFT,
  USER_NFT,
  ALL_NFT_MARKET,
} from "../constantes/index";

import io from "socket.io-client";
import { toast } from "react-toastify";
let socket;
socket = io(import.meta.env.VITE_BACKEND_URL);

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
export function allNFTUser() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    let json = await clienteAxios.get(`/nft/portfolio`, config);

    return dispatch({
      type: USER_NFT,
      payload: json.data,
    });
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
    const id = payload.id;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    };

    try {
      if (!payload.flag) {
        const response = await clienteAxios.post(
          "/coleccion",
          {
            name: payload.colection,
          },
          config
        );
      }

      const body = {
        category: payload.category,
        colection: payload.colection,
        price: Number(payload.price),
        image: payload.image,
      };

      const form = new FormData();
      for (let key in body) {
        form.append(key, body[key]);
      }

      await clienteAxios.post(`/nft`, form, config);
      //socket.io
      socket.emit("NftCreado");
      toast.success("NFT creado correctamente");
      return dispatch({
        type: CREATE_NFT,
        payload: true,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };
}

export function reset(payload) {
  return async function (dispatch) {
    return dispatch({
      type: RESET,
      payload: false,
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

export function nftWithUser() {}

export function comprarNFT(payload) {
  return async function () {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const nft = await clienteAxios.post(
        `/nft/comprar/${payload}`,
        {},
        config
      );

      //socket.io
      toast.success(`Compraste este NFT: ${nft.data.NFT_id}`);
      socket.emit("ventaNFT");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}

export function venta(payload) {
  const { _id, avaliable, id } = payload;
  return async function () {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await clienteAxios.put(`nft/vender/${_id}`, {}, config);

      //alert
      avaliable
        ? toast.info(`Tu NFT ya no está en venta ${id} `, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        : toast.info(`Pusiste a la venta tu nft ${id}`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      //socket.io
      socket.emit("ponerEnVenta");
    } catch (e) {
      toast.error(e.response.data.msg);
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
  return async function () {
    const token = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await authAxios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/nft/${_id}`,
      { price: payload }
    );

    //socket.io
    socket.emit("editarPrecio");
  };
}

export function Gift_NFT(iduser, idnft, colection) {
  return async function () {
    const token = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await authAxios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/nft/gift`,
      { iduser: iduser, idnft: idnft, colection: colection }
    );
  };
}
