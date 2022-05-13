import axios from "axios";

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
    const id = payload.id;

    console.log(body);

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

    let json = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/nft`,
      form,
      config
    );
    console.log(json);
  };
}

export function nftWithUser() {}
