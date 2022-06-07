import clienteAxios from "../../src/config/clienteAxios";
import io from "socket.io-client";
import {
  VALIDATE_USER,
  RESET_PASSWORD,
  RESET_ERROR,
  SEND_EMAIL_TO_RESET_PASSWORD,
  RESET_ERROR_LOGUIN_USER,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SHOW_USERS_ID,
  ACTUAL,
  TRANSFERIR_CL,
  RANKING_PORTFOLIOS,
  GOOGLE_LOGIN,
  NOTIFICATION_USER,
  NOTIFICATION_USER_TRUE,
} from "../constantes";
import { toast } from "react-toastify";
import axios from "axios";
let socket;
socket = io(import.meta.env.VITE_BACKEND_URL);

export function registroGoogle(googleData) {
  return async function (dispatch) {
    const token = googleData.credential;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuario/google`,
        { idToken: token }
      );
      localStorage.setItem("token", response.data.token);
      return dispatch({
        type: GOOGLE_LOGIN,
        payload: response.data,
      });
    } catch (err) {
      toast.error(err);
    }
  };
}

export function registroUsuario({ nombre, email, password1 }) {
  return async function () {
    try {
      const body = {
        nombre,
        email,
        password: password1,
      };

      const response = await clienteAxios.post(`/usuario`, body);

      toast.success(response.data);
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };
}

export function validateUser(id) {
  return async function (dispatch) {
    try {
      var json = await clienteAxios(`/usuario/confirmar/${id}`);
      toast.success("User validated successfully");
      return dispatch({
        type: VALIDATE_USER,
        payload: json.data,
      });
    } catch (error) {
      toast.error("There was an error validating the user");
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
      return dispatch({
        type: RESET_PASSWORD,
        payload: json.data,
      });
    } catch (error) {
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

export function userLogout(dispatch) {
  localStorage.clear();
  return dispatch({
    type: LOGOUT_USER,
  });
}

export function showUsers() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const json = await clienteAxios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/usuario/traer-usuarios`,
      config
    );
    return dispatch({
      type: SHOW_USERS_ID,
      payload: json.data,
    });
  };
}

export function cambiarImagen(payload) {
  return async function (dispatch) {
    const id = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    };
    try {
      const body = {
        image: payload,
      };
      const form = new FormData();
      for (let key in body) {
        form.append(key, body[key]);
      }
      const json = await clienteAxios.put(`/usuario/imagen`, form, config);
      toast.success(json.data.msg);
      socket.io;
      socket.emit("update2");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}

export function usuarioActual() {
  return async function (dispatch) {
    const id = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    };

    try {
      const json = await clienteAxios.get("/usuario/actual", config);

      return dispatch({
        type: ACTUAL,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
export function comprarCL(cuantity) {
  return async function () {
    try {
      const json = await clienteAxios.post(
        `${import.meta.env.VITE_BACKEND_URL}/process-payment`,
        { cuantity }
      );
      socket.emit("Redireccion", json.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function topPortfolios() {
  return async function (dispatch) {
    try {
      const id = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${id}`,
        },
      };
      const json = await clienteAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/wealthyportfolios`,
        config
      );
      return dispatch({
        type: RANKING_PORTFOLIOS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getValuePortfolio() {
  return async function () {
    try {
      const id = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${id}`,
        },
      };
      await clienteAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/nft/valueport`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function transferirCL({ cl, user }) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const json = await authAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuario/transferir`,
        { cl, user }
      );
      toast.success(json.data.msg);
      socket.emit('renderHome')
      socket.emit("Transferencia");
      return dispatch({
        type: TRANSFERIR_CL,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}

export function searchNotification() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const json = await authAxios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuario/notificaciones`
      );
      return dispatch({
        type: NOTIFICATION_USER,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function viewNotification(id) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      await authAxios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuario/notificacion/${id}`
      );

      return dispatch({
        type: NOTIFICATION_USER_TRUE,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
