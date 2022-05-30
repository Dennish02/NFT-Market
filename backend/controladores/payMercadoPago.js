import mercadopago from "mercadopago";

import Usuario from "../models/Usuarios.js";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MP,
});

export const payMercadoPago = (req, res) => {
  const { cuantity } = req.body;
  
  try {
    let preference = {
      items: [
        {
          title: "CinsLie",
          unit_price: 1,
          quantity: Number(cuantity),
        },
      ],
      back_urls: {
        success: process.env.FRONTEND_URL + "/home/usuario/wallet/confirmar",
        failure: process.env.FRONTEND_URL + "/home/usuario/wallet/failure",
        pending: process.env.FRONTEND_URL + "/home/usuario/wallet/failure",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        return res.send(response.body.init_point);
      })
      .catch(function (error) {
        return res.status(500).send(error);
      });
  } catch (err) {
    console.log(err);
  }
};
export const setCoins = async (req, res) => {
  const { value } = req.body;
  const nombre = req.usuario.nombre;

  try {
    const usuarioBD = await Usuario.findOne({ nombre });
    usuarioBD.coins += Number(value);

    await usuarioBD.save();
    return res.json({ msg: "Coins updated" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
