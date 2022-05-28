import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js";

//custom middleware para proteger las rutas
const checkOut = async (req, res, next) => {
  let token;
  //se envian por headers los token de autorizacion
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //bearer paoque asi se recibe el token
    try {
      //entra el JWT en este token
      token = req.headers.authorization.split(" ")[1]; //para sacar Bearer uy dejar solo el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //se usa la variable de entornno que s eunso para verificar

      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      ); //saca del modleo tood loq eu esta en el parentesis


      return next();
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
  if (!token) {
    const error = new Error("Token No Válido");
    return res.status(404).json({ msg: error.message });
  }

  next();
};

export default checkOut;
