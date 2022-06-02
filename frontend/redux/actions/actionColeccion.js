import clienteAxios from "../../src/config/clienteAxios";
import { toast } from "react-toastify";
import { SET_COLECCIONES, LOAD_COLECCIONES } from "../constantes";

import io from "socket.io-client";
let socket;
socket = io(import.meta.env.VITE_BACKEND_URL);

export function coleccionesUsuario() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const json = await clienteAxios.get("/coleccion/usuario", config);
    //socket.emit("updateCollections")
    return dispatch({
      type: SET_COLECCIONES,
      payload: json.data,
    });
  };
}

export function crearColeccion(payload) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await clienteAxios.get("/coleccion", config);
    const existe = response.data.filter((col) => col.name === payload);
    if (existe.length === 0) {
      await clienteAxios.post(
        "/coleccion",
        {
          name: payload,
        },
        config
      );
      socket.emit("updateCollections");
      toast.success("Collection created");
      return dispatch({
        type: LOAD_COLECCIONES,
      });
    } else {
      toast.error("The collection already exists");
    }
  };
}
