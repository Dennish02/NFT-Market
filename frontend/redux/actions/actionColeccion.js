import clienteAxios from "../../src/config/clienteAxios";
import { toast } from "react-toastify";
import { SET_COLECCIONES } from "../constantes";

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
      const response = await clienteAxios.post(
        "/coleccion",
        {
          name: payload,
        },
        config
      );
      toast.success("Coleccion creada");
    } else {
      toast.error("La coleccion ya existe");
    }
  };
}
