import Usuario from "../models/Usuarios.js";
import { generarID } from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import { OAuth2Client } from "google-auth-library";
import Notificacion from "../models/Notificacion.js";

const client = new OAuth2Client(process.env.CLIENT_ID);

const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    client
      .verifyIdToken({
        idToken,
        audience: process.env.CLIENT_ID,
      })
      .then((response) => {
        const { email_verified, picture, given_name, email } = response.payload;
        if (email_verified) {
          Usuario.findOne({ email }).exec((err, user) => {
            if (err) {
              return res.status(400).json({ error: "Something went wrong " });
            } else {
              if (user) {
                const token = generarJWT(user._id);
                const { _id, nombre, email } = user;
                res.json({
                  _id: _id,
                  nombre: nombre,
                  email: email,
                  token: token,
                });
              } else {
                let nuevoUsuario = new Usuario({
                  nombre: given_name,
                  email,
                  image: { public_id: "", url: picture },
                });
                nuevoUsuario.confirmado = true;
                nuevoUsuario.save();
                const token = generarJWT(nuevoUsuario._id);
                res.json({
                  _id: nuevoUsuario._id,
                  nombre: nuevoUsuario.given_name,
                  email: nuevoUsuario.email,
                  token: token,
                });
              }
            }
          });
        }
      });
    const usuario = new Usuario({});
  } catch (error) {
    console.log(error);
  }
};

const cambiarImage = async (req, res) => {
  const nombre = req.usuario.nombre;
  const formatos = ["png", "jpg", "webp", "gif"];
  if (
    !formatos.includes(
      req.files.image.name.split(".")[
        req.files.image.name.split(".").length - 1
      ]
    )
  ) {
    return res
      .status(400)
      .send({ msg: "Invalid image format (jpg, png, webp or gif)" });
  }
  try {
    if (req.files.image) {
      const user = await Usuario.findOne({ nombre });
      const response = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);

      const image = {
        url: response.secure_url,
        public_id: response.public_id,
      };

      user.image = image;
      await user.save();
      return res.json({ msg: "Image updated" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "Error" });
  }
};

const usuario = async (req, res) => {
  try {
    const user = await Usuario.findOne({ nombre: req.usuario.nombre })
      .populate("favoritos")
      .select(" -password -confirmado  -createdAt -updatedAt -__v");
    return res.send(user);
  } catch (e) {
    return res.status(400).json({ msg: "Error" });
  }
};

const registrar = async (req, res) => {
  const { email, nombre } = req.body;
  if (nombre.length > 10) {
    const error = new Error("The username cannot have more than 10 characters");
    return res.status(400).json({ msg: error.message });
  }

  const usuarioRepetido = await Usuario.findOne({ nombre });
  const exiteUsiario = await Usuario.findOne({ email }); //busca si existe

  if (exiteUsiario || usuarioRepetido) {
    const error = new Error(
      usuarioRepetido ? "User already exists" : "Mail already exists"
    );
    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario({
      ...req.body,
      image: { public_id: "", url: "" },
    });
    usuario.token = generarID(); //id hasheado
    await usuario.save();

    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res
      .status(200)
      .send("User created, check your email to confirm your account");
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("User don't exists");
    return res.status(404).json({ msg: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error("Your account hasn't been confirmed");
    return res.status(403).json({ msg: error.message });
  }

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      image: usuario.image,
      token: generarJWT(usuario._id), //mandar el id por JWT
    });
  } else {
    const error = new Error("Password is incorrect");
    res.status(403).json({ msg: error.message });
  }
};

const confimrar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token }); //buscar el usuario por el token
  if (!usuarioConfirmar) {
    const error = new Error(
      "The user wasn't confirmed or the token is invalid"
    );
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true; //cambiando estado para que esté confirmado
    usuarioConfirmar.token = ""; //eliminar token porque se usa una vez
    await usuarioConfirmar.save(); //almacenar con los cambios
    res.json({ msg: "User confirmed successfully" });
  } catch (error) {
    console.log(error);
  }
};
const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("User don't exists");
    res.status(404).json({ msg: error.message });
  } else {
    try {
      usuario.token = generarID();
      await usuario.save();

      //enviar el email

      emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token,
      });

      res.json({ msg: "An email was sent with instructions." });
    } catch (error) {
      console.log(error);
    }
  }
};

//validar token para cambiar su password
const comporbarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    registrar.json({ msg: "The user is already exists" });
  } else {
    const error = new Error("Token invalid");
    res.status(404).json({ msg: error.message });
  }
};
//resetar constraseña
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";

    try {
      await usuario.save();
      res.json({ msg: "Password updated" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token Invalid");
    res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const user = await Usuario.findOne({ nombre: req.usuario.nombre }).select(
    "-password -hasTradeOffers -email -transacciones -favoritos -confirmado  -createdAt -updatedAt -__v"
  ); //populate trae la data de la referencia

  res.json(user);
};

const traerUsuarios = async (req, res) => {
  //traigo todos los user y los mapeo para que solo me muestre el ID y nombre
  await Usuario.find({}).then((results) => {
    let userMapeado = results.map((el) => {
      return {
        id: el.id,
        name: el.nombre,
      };
    });
    return res.json(userMapeado);
  });
};

const transferirCl = async (req, res) => {
  const { cl, user } = req.body;

  const usuarioA = await Usuario.findOne({ nombre: req.usuario.nombre });
  const coinsA = usuarioA.coins;

  const usuarioB = await Usuario.findOne({ nombre: user });
  if (!usuarioB) {
    return res.status(401).json({ msg: "User doesn't exist" });
  }

  const coinsB = await usuarioB.coins;

  if (usuarioA.coins < cl) {
    res.status(401).json({ msg: "You don't have enough CL to sendr" });
  }

  try {
    if (usuarioA.coins >= cl) {
      usuarioA.coins = usuarioA.coins - Number(cl);
      usuarioA.save();

      usuarioB.coins = usuarioB.coins + Number(cl);
      usuarioB.save();

      //notificación
      const notificacion = new Notificacion({
        msg: `${usuarioA.nombre} has transferred you ${cl}CL`,
      });
      usuarioB.notificaciones.unshift(notificacion);
      await notificacion.save();

      res.json({
        msg: `${usuarioA.nombre} has sent ${cl}CL to ${usuarioB.nombre}`,
      });
    }
  } catch (error) {
    //si falla devuelve las coins a su estado inicial
    usuarioA.coins = coinsA;
    usuarioA.save();

    usuarioB.coins = coinsB;
    usuarioB.save();

    res.status(401).json({ msg: "Could not transfer CL" });
  }
};

const notificaciones = async (req, res) => {
  try {
    const { notificaciones } = await Usuario.findOne({
      nombre: req.usuario.nombre,
    }).populate("notificaciones");
    res.status(200).send(notificaciones);
  } catch (error) {
    res.send(error);
  }
};

const notificacionVista = async (req, res) => {
  try {
    const { id } = req.params;
    var notificacion = await Notificacion.findById(id);

    if (notificacion === null) {
      const error = new Error("Notification doesn't exist");
      return res.json({ msg: error.message });
    } else {
      notificacion.visto = true;
      notificacion = await notificacion.save();

      res.send(notificacion);
    }
  } catch (error) {
    res.send(error);
  }
};

export {
  googleLogin,
  registrar,
  autenticar,
  confimrar,
  olvidePassword,
  comporbarToken,
  nuevoPassword,
  perfil,
  traerUsuarios,
  cambiarImage,
  usuario,
  transferirCl,
  notificaciones,
  notificacionVista,
};
