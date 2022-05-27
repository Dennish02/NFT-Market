import axios from "axios";
import clienteAxios from "../../src/config/clienteAxios";

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
  FILTER_COLECTION,
  ADD_NFT_FAVORITE,
  SORT,
  SAVE_VALUE,
  LIKE_NFT,
  SORT_POP,
  TRADE_OFFER,
  SEE_OFFER,
} from "../constantes/index";

import { toast } from "react-toastify";

import io from "socket.io-client";
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
      socket.emit("renderHome");
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

      let json = await clienteAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/sacarFavoritos/${payload}`, {}, config
      );   

      //socket.io
      toast.success(`Compraste este NFT: ${nft.data.NFT_id}`);
      socket.emit("renderHome");
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
      socket.emit("Render");
      socket.emit("update");
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
    socket.emit("renderHome");
    socket.emit("update");
  };
}

export function Gift_NFT(iduser, idnft, colection) {
  return async function () {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const json = await clienteAxios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/nft/gift`,
      { iduser, idnft, colection },
      config
    );
    socket.emit("update");
    // socket.emit("renderHome");
  };
}

export function filterColection(payload) {
  return async function (dispatch) {
    // socket.emit("renderHome");
    return dispatch({
      type: FILTER_COLECTION,
      payload,
    });
  };
}

export function AñadirFav(id) {
  return async function () {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      let json = await authAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/favoritos/${id}`
      );

      socket.emit("renderHome");
      toast.success(json.data.msg);
    } catch (error) {
      toast.error(error);
    }
  };
}

export function eliminarFav(id) {
  return async function () {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      let json = await authAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/sacarFavoritos/${id}`
      );

      socket.emit("renderHome");
      toast.success(json.data.msg);
    } catch (error) {
      console.log(error);
    }
  };
}

export function sort(payload) {
  return async function (dispatch) {
    return dispatch({
      type: SORT,
      payload,
    });
  };
}

export function setNewCoin(value) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const json = await clienteAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/process-payment/setcoins`,
        { value },
        config
      );

      toast.success(json.data.msg);
      return dispatch({
        type: SAVE_VALUE,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function darLike(id) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const json = await authAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/like/${id}`
      );
      json.data.alert
        ? toast.warning(json.data.alert)
        : toast.success(json.data.msg);
      socket.emit("renderHome");
      return dispatch({
        type: LIKE_NFT,
        payload: json.data,
      });
    } catch (error) {
      toast.warning(error.response.data.msg);
    }
  };
}

export function sortPopularity(payload) {
  return async function (dispatch) {
    return dispatch({
      type: SORT_POP,
      payload,
    });
  };
}



export function tradeOffer(nftId, nftOffered, owner) {

  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    try {

      const json = await authAxios.post (
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/tradeoffer`,{ nftId, nftOffered,owner})
        
        

        toast.success(json.data.msg);
        return dispatch ({
          type: TRADE_OFFER,
          payload: json.data
        })
    } catch (error) {
      toast.warning(error.response.data.msg);
    }
  };
}

export function seeOffers() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const json = await authAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/seeoffers`
      );

      // console.log(json.data)
      return dispatch({
        type: SEE_OFFER,
        payload: json.data,
      });
    } catch (error) {
      toast.warning(error);
    }
  };
}
