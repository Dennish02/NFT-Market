import Usuario from "../models/Usuarios.js";
import { generarID } from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import { OAuth2Client } from'google-auth-library'

// const googleValidate = async (req,res) => {
//   const {email, tokenGoogle} = req.body
//   const usuario = await Usuario.findOne({ email });
//   if (!usuario) {
    
//     const error = new Error("EL USUARIO NO EXISTE");
//     return res.status(404).json({ msg: error.message });
//   }
// }
const client = new OAuth2Client("191662824366-t2ai2ljblpt0nrbaet49vudt5vbiemgf.apps.googleusercontent.com");

const googleLogin = async (req,res) => {
  const { idToken } = req.body;
  // console.log('soy backend', idToken)
  try {
    
    client.verifyIdToken({idToken, audience: "191662824366-t2ai2ljblpt0nrbaet49vudt5vbiemgf.apps.googleusercontent.com"}).then(response => {
      const {email_verified, given_name, email} = response.payload
      if(email_verified){
        Usuario.findOne({email}).exec((err, user) => {
          if(err){
            return res.status(400).json({error: 'Something went wrong '})
          }else {
            if(user){
               
                const token =  generarJWT(user._id)
                const {_id ,nombre, email} = user
                res.json({
                  _id: user._id,
                  nombre: user.nombre,
                  email: user.email,
                  token : token
                  // { token, _id, nombre,  email}
                })
            } else{
              
              let nuevoUsuario = new Usuario({nombre: given_name, email, image: { public_id: "", url: "" },})
              nuevoUsuario.confirmado= true;
              nuevoUsuario.save()
            }
          }
        })
      }
    })
    
    const usuario = new Usuario({})
     
  } catch (error) {
    console.log(error)
  }
}

const cambiarImage = async (req, res) => {
  const nombre = req.usuario.nombre;
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
      return res.json({ msg: "imagen modificada" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "error" });
  }
};

const usuario = async (req, res) => {
  try {
    const user = await Usuario.findOne({ nombre: req.usuario.nombre })
                        .populate("favoritos")
                        .select(" -password -confirmado  -createdAt -updatedAt -__v");
    return res.send(user);
  } catch (e) {
    return res.status(400).json({ msg: "error" });
  }
};

const registrar = async (req, res) => {
  //Evitar registros dupicados
  //* * Este controlador esta termiando
  const { email, nombre } = req.body;
  if (nombre.length > 10) {
    const error = new Error("El usuario no puede tener mas de 10 caracteres");
    return res.status(400).json({ msg: error.message });
  }

  const usuarioRepetido = await Usuario.findOne({ nombre });
  const exiteUsiario = await Usuario.findOne({ email }); //busca si existe

  if (exiteUsiario || usuarioRepetido) {
    const error = new Error(usuarioRepetido ? "Usuario en uso" : "Mail en uso");
    return res.status(400).json({ msg: error.message });
  }
  try {
    // const usuario = new Usuario(req.body)
    const usuario = new Usuario({
      ...req.body,
      image: { public_id: "", url: "" },
    });
    usuario.token = generarID(); //id hasheado
    await usuario.save();

    //emil de registro
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res
      .status(200)
      .send("Usuario creado, Revisa tu email para confirmar tu cuenta");
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  //* * Este controlador esta termiando
  const { email, password } = req.body;
  //comprobar si existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    
    const error = new Error("EL USUARIO NO EXISTE");
    return res.status(404).json({ msg: error.message });
  }
  //comprobar sui esta confirnadi
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  //consifmar su password
  // console.log(password);
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      image: usuario.image,
      token: generarJWT(usuario._id), //mandar el id por JWT
    });
  } else {
    const error = new Error("la contraseña es incorrecta");
    res.status(403).json({ msg: error.message });
  }
};

const confimrar = async (req, res) => {
  //* * Este controlador esta termiando

  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token }); //buscar el usuario por el token
  if (!usuarioConfirmar) {
    const error = new Error("EL usuario ya se confirmó o el token es inválido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true; //cambiando estado para que esté confirmado
    usuarioConfirmar.token = ""; //elimianr token porque se usa una vez
    await usuarioConfirmar.save(); //almacenar con los cambios
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};
const olvidePassword = async (req, res) => {
  //* * Este controlador esta termiando

  const { email } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("EL USUARIO NO EXISTE");
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

      res.json({ msg: "Eviamos un correo con las instrucciones" });
    } catch (error) {
      console.log(error);
    }
  }
};

//validar token para cambiar su password
const comporbarToken = async (req, res) => {
  //* * Este controlador esta termiando

  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    registrar.json({ msg: "El usuario Existe" });
  } else {
    const error = new Error("Token Incorrecto");
    res.status(404).json({ msg: error.message });
  }
};
//resetar constraseña
const nuevoPassword = async (req, res) => {
  //todo: dennis teminado

  const { token } = req.params;
  const { password } = req.body;
  console.log({ token, password });
  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";

    try {
      await usuario.save();
      res.json({ msg: "Contraseña actualizada" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token Incorrecto");
    res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  // const { usuario } = req; // se lee del server
  const user = await Usuario.findOne({ nombre: req.usuario.nombre }).select("-password -hasTradeOffers -email -transacciones -favoritos -confirmado  -createdAt -updatedAt -__v"); //populate trae la data de la referencia
 
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
    // const usuarioB = await Usuario.findById( user );
    if(!usuarioB){
      return res.status(401).json({msg: "No existe el usuario"})
    }

    const coinsB = await usuarioB.coins;

  if (usuarioA.coins < cl) {
    res.status(401).json({ msg: "No tienes CL suficientes para enviar" });
  }

    try {
      if (usuarioA.coins >= cl) {
      usuarioA.coins = usuarioA.coins - Number(cl);
      usuarioA.save();
        
      usuarioB.coins = usuarioB.coins + Number(cl);
      usuarioB.save();
  
      res.json({ msg: `${usuarioA.nombre} Ha enviado ${cl}CL a ${usuarioB.nombre}` });
  
      }  
    
    } catch (error) {
      //si falla devuelve las coins a su estado inicial
      usuarioA.coins = coinsA;
      usuarioA.save();
  
      usuarioB.coins = coinsB;
      usuarioB.save();
  
      res.status(401).json({ msg: "No se pudo transferir CL"});


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

};
