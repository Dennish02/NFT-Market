import axios from "axios";
import { Form } from "formik";

export function allNftMarket() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/api/nft/");
      return dispatch({
        type: "ALL_NFT_MARKET",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function crearNFT(payload) {
  return async function () {
    const body = {
      category: payload.category,
      colection: payload.colection,
      price: Number(payload.price),
      image: payload.image,
    };
    let form = new FormData();

    for (let key in body) {
      console.log(key);
      console.log(body[key]);
      form.append(key, body[key]);
    }

    const id = payload.id;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${id}`,
      },
    };

    let json = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/nft`,
      form,
      config
    );
    console.log(json);
  };
}

export function nftWithUser() {}
