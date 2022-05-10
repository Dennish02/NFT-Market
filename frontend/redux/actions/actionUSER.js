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

export function registroUsuario({ nombre, email, password }) {
  console.log(nombre);
  console.log(email);
  console.log(password);
  return async function () {
    try {
      const body = {
        nombre,
        email,
        password,
        image: "ruta",
        coins: 1000,
      };
      const response = await axios.post(
        "http://localhost:3001/api/usuario",
        body
      );
      console.log(response.data);
      alert(response.data);
    } catch (e) {
      //   console.log(e);
      alert(e.response.data.msg);
    }
  };
}

// export function nftWithUser() {}
