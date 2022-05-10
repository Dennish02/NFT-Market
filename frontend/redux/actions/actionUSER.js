import axios from "axios";
import profile1 from "../../src/img/profile1.png";
import profile2 from "../../src/img/profile2.png";
import profile3 from "../../src/img/profile3.png";
import { LOGUIN_USER, VALIDATE_USER } from "../constantes"

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
  const n = Math.floor(Math.random() * 10) % 3;

  return async function () {
    try {
      const body = {
        nombre,
        email,
        password,
        image:
          n === 0
            ? profile1.toString()
            : n === 1
            ? profile2.toString()
            : profile3.toString(),
        coins: 1000,
      };
      console.log(body);
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
export function login (payload) {
  return async function(dispatch){
    try {
      let json = await axios.post(`http://localhost:3001/api/usuario/login`, payload)
      console.log(json)
      return dispatch({
        type: LOGUIN_USER,
        payload: json.data
      })
    } catch (error) {
      console.log(error.response.data.msg)
    }
}
}