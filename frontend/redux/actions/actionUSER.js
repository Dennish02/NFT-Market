import profile1 from "../../src/img/profile1.png";
import profile2 from "../../src/img/profile2.png";
import profile3 from "../../src/img/profile3.png";
import clienteAxios from "../../src/config/clienteAxios";

import {
  VALIDATE_USER,
  RESET_PASSWORD,
  RESET_ERROR,
  SEND_EMAIL_TO_RESET_PASSWORD,
  RESET_ERROR_LOGUIN_USER,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_GOOGLE,
  SHOW_USERS_ID,
} from "../constantes";
import { toast } from "react-toastify";
import axios from "axios";

// export function allNftMarket() {
//   return async function (dispatch) {
//     try {
//       var json = await axios.get("http://localhost:3001/api/nft/");
//       return dispatch({
//         type: "ALL_NFT_MARKET",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export function loguinGoogle(googleData) {
  return async function (dispatch) {
    const token = googleData.tokenId;
    const googleId = googleData.googleId;
    let api = import.meta.env.VITE_API;
    const config = {
      headers: {
        api: api,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      var json = await clienteAxios.post(`/usuario/login`, {
        config,
        googleId,
      });
      return dispatch({
        type: LOGIN_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function registroUsuario({ nombre, email, password1 }) {
  const n = Math.floor(Math.random() * 10) % 3;
  return async function () {
    try {
      const body = {
        nombre,
        email,
        password: password1,
        image:
          n === 0
            ? profile1.toString()
            : n === 1
            ? profile2.toString()
            : profile3.toString(),
      };

      const response = await clienteAxios.post(`/usuario`, body);
      //console.log(response);
      toast.success(response.data);
    } catch (e) {
      //   console.log(e);
      toast.error(e.response.data.msg);
    }
  };
}

export function validateUser(id) {
  return async function (dispatch) {
    try {
      var json = await clienteAxios(`/usuario/confirmar/${id}`);
      toast.success("Tu usuario se validó correctamente");
      return dispatch({
        type: VALIDATE_USER,
        payload: json.data,
      });
    } catch (error) {
      toast.error("Hubo un error al validar tu usuario");
      return dispatch({
        type: VALIDATE_USER,
        payload: error.response.data,
      });
    }
  };
}

export function sedEmailToResetPassword(data) {
  return async function (dispatch) {
    try {
      let json = await clienteAxios.post(`/usuario/olvide-password/`, {
        email: data,
      });

      toast.success(json.data.msg);

      return dispatch({
        type: SEND_EMAIL_TO_RESET_PASSWORD,
        payload: json.data,
      });
    } catch (error) {
      toast.error(error.response.data.msg);
      return dispatch({
        type: SEND_EMAIL_TO_RESET_PASSWORD,
        payload: { error: error.response.data.msg },
      });
    }
  };
}
export function resetPassword(data) {
  const { token, password } = data;
  return async function (dispatch) {
    try {
      let json = await clienteAxios.post(`/usuario/olvide-password/${token}`, {
        password,
      });
      //console.log(json.data);
      //toast.success('Contraseña Actualiada')
      return dispatch({
        type: RESET_PASSWORD,
        payload: json.data,
      });
    } catch (error) {
      //console.log(error.response.data);
      //toast.error(error.response.data.msg)
      return dispatch({
        type: RESET_PASSWORD,
        payload: { error: error.response.data.msg },
      });
    }
  };
}
export function setStateEmail() {
  return async function (dispatch) {
    let reseet = [];
    return dispatch({
      type: RESET_ERROR,
      payload: reseet,
    });
  };
}

export function login(payload) {
  return async function (dispatch) {
    try {
      let json = await clienteAxios.post(`/usuario/login`, payload);
      localStorage.setItem("token", json.data.token);
      return dispatch({
        type: LOGIN_USER,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: LOGIN_USER,
        payload: { error: error.response.data.msg },
      });
    }
  };
}
export function resetErrorLoginUser() {
  return function (dispatch) {
    let nada = [];
    return dispatch({
      type: RESET_ERROR_LOGUIN_USER,
      payload: nada,
    });
  };
}
export function autenticarUser(config) {
  return async function (dispatch) {
    try {
      let json = await clienteAxios(`/usuario/perfil`, config);

      return dispatch({
        type: AUTH_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
}

export function userLogout() {
  localStorage.clear();
  return {
    type: LOGOUT_USER,
  };
}

export function showUsers(payload) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = clienteAxios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/usuario/traer-usuarios`
    );
    return dispatch({
      type: SHOW_USERS_ID,
      payload: json.data,
    });
  };
}
