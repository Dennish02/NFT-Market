import axios from "axios";
import profile1 from "../../src/img/profile1.png";
import profile2 from "../../src/img/profile2.png";
import profile3 from "../../src/img/profile3.png";
import { VALIDATE_USER } from '../constantes'
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
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuario`,
        body
      );
      alert(response.data);
    } catch (e) {
      //   console.log(e);
      alert(e.response.data.msg);
    }
  };
}


export function validateUser(id) {

    return async function(){
      var json = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuario/confirmar/${id}`);
      alert(json.data.msg)
      console.log(json.data);
      return ({
          type: VALIDATE_USER,
          payload: json.data
      })
  }
 
  
}
// export function nftWithUser() {}
