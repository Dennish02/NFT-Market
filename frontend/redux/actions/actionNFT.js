
import clienteAxios from "../../src/config/clienteAxios";

import {
  CREATE_NFT,
  RESET,
  SEARCH_NFT,
  USER_NFT,
  ALL_NFT_MARKET,
  FILTER_COLECTION,
  SORT,
  SAVE_VALUE,
  SORT_POP,
  TRADE_OFFER,
  SEE_OFFER,
  RESPONSE_OFFER,
  CANCEL_OFFER,
  DELETE_OFFER,
  LIKE_FAVORITE,
  CAMBIAR_VENTA,
  FILTER_CATEGORY

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
      toast.success("NFT created successfully");
      return dispatch({
        type: CREATE_NFT,
        payload: true,
      });
    } catch (error) {
      toast.error(error.response.data.msg);
      return dispatch({
        type: CREATE_NFT,
        payload: true,
      });
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
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/sacarFavoritos/${payload}`,
        {},
        config
      );
      socket.emit('Render');
      socket.emit("renderHome");
      //socket.io
      toast.success(`You bought this NFT: ${nft.data.NFT_id}`);
     
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}

export function venta(payload) {
  const { _id, avaliable, id } = payload;
  return async function (dispatch) {
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
        ? toast.info(`Your NFT is no longer for sale ${id} `, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        : toast.info(`You put your ntf for sale ${id}`, {
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
      socket.emit("renderHome");
      return dispatch({
        type: CAMBIAR_VENTA,
        payload: _id,
      });
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
    const authAxios = clienteAxios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const json = await authAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/${_id}`,
        { price: payload }
      );
      toast.success("Price updated successfully");
      socket.emit("renderHome");
      socket.emit("update");
    } catch (error) {
      toast.warning(error.response.data.msg);
    }
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
  };
}

export function filterColection(payload) {
  return async function (dispatch) {
    return dispatch({
      type: FILTER_COLECTION,
      payload,
    });
  };
}

export function AñadirFav(id) {
  return async function (dispatch) {
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

      const nft = await authAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/select/${id}`
      );
      toast.success(json.data.msg);
      return dispatch({
        type: LIKE_FAVORITE,
        payload: nft.data,
      });
    } catch (error) {
      toast.error(error);
    }
  };
}

export function eliminarFav(id) {
  return async function (dispatch) {
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

      const nft = await authAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/select/${id}`
      );
      socket.emit("Render");
      toast.success(json.data.msg);
      return dispatch({
        type: LIKE_FAVORITE,
        payload: nft.data,
      });
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

      const nft = await authAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/select/${id}`
      );

      return dispatch({
        type: LIKE_FAVORITE,
        payload: nft.data,
      });
    } catch (error) {
      toast.warning(error.response);
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

export function tradeOffer(trade) {
  const { nftId, nftOffered, owner } = trade;
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const json = await authAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/tradeoffer`,
        { nftId, nftOffered, owner }
      );

      toast.success("your send offert succesfully");

      socket.emit("updateTrades");
      socket.emit("update");
      socket.emit("renderHome");
      return dispatch({
        type: TRADE_OFFER,
        payload: json.data,
      });
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
      return dispatch({
        type: SEE_OFFER,
        payload: json.data,
      });
    } catch (error) {
      toast.warning(error);
    }
  };
}

export function responseOffer({ response, newId }) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const json = await authAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/responseoffer`,
        { response, newId }
      );

      socket.emit("updateTrades");
      socket.emit("update");
      socket.emit("renderHome");

      toast.success(json.data.msg);
      return dispatch({
        type: RESPONSE_OFFER,
      });
    } catch (error) {
      toast.error(error.response.msg);
    }
  };
}

export function cancelOffer({ id }) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const json = await authAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/canceloffer`,
        { id }
      );

      socket.emit("updateTrades");
      socket.emit("update");
      socket.emit("renderHome");
      toast.success(json.data.msg);
      return dispatch({
        type: CANCEL_OFFER,
      });
    } catch (error) {
      toast.warning(error.response.msg);
    }
  };
}

export function deleteOffer(id) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const json = await authAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/deleteoffer`,
        id
      );
      socket.emit("updateTrades");
      socket.emit("update");
      socket.emit("renderHome");

      toast.success("Deleted successfully");
      return dispatch({
        type: DELETE_OFFER,
      });
    } catch (error) {
      toast.error(error);
    }
  };
}

export function filterNftCategory(payload) {

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
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/filter/${payload}` );
        return dispatch({
          type: FILTER_CATEGORY,
          payload: json.data
        });
        
    } catch (error) {
      toast.error(error);
    }

  }
}
