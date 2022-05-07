import Usuario from "../models/Usuarios.js";
import { generarID } from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";



const registrar = async (req, res)=>{

    //Evitar registros dupicados
    const {email , nombre}= req.body;
    const usuarioRepetido = await Usuario.findOne({nombre})
    const exiteUsiario = await Usuario.findOne({email})//busca si existe

    if(exiteUsiario || usuarioRepetido){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg : error.message })
    }
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarID()//id hasheado
       const usuarioAlmacenado = await usuario.save()
       res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error);
    }
    
}

const autenticar = async (req, res)=>{
    const { email , password } = req.body
    
   //comprobar si existe
    const usuario = await Usuario.findOne({email})
    
    if(!usuario){
        const error = new Error("EL USUARIO NO EXISTE");
       return res.status(404).json({msg: error.message});
    }
   //comprobar sui esta confirnadi
   if(!usuario.confirmado){
    const error = new Error("Tu cuenta no ha sido confirmada")
    return res.status(403).json({msg: error.message})
    }
   //consifmar su password
   
    
   if(await usuario.comprobarPassword(password)){
       res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)//mandar el id por JWT
        });
    }else{
      const error = new Error("la contraseña es incorrecta")
      res.status(403).json({msg: error.message})
    }
    
}

const confimrar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token })//buscar el usuario por el token
    if (!usuarioConfirmar) {
        const error = new Error("Hubo un error")
        res.status(404).json({ msg: error.message })
    }
    try {
        usuarioConfirmar.confirmado = true //cambiando estado para que esté confirmado
        usuarioConfirmar.token = '' //elimianr token porque se usa una vez
        await usuarioConfirmar.save()//almacenar con los cambios
        res.json({ msg: 'Usuario confirmado correctamente' })
    } catch (error) {
        console.log(error)
    }

}
const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error("EL USUARIO NO EXISTE")
        res.status(404).json({ msg: error.message })
    }

    try {
        usuario.token = generarID()
        await usuario.save();
        res.json({ msg: 'Eviamos un correo con las instrucciones' })
    } catch (error) {
        console.log(error);
    }
}

//validar token para cambiar su password
const comporbarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token })

    if (tokenValido) {
        registrar.json({ msg: 'El usuario Existe' })
    } else {
        const error = new Error("Token Incorrecto")
        res.status(404).json({ msg: error.message })
    }
}
//resetar constraseña
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token })

    if (usuario) {
        usuario.password = password
        usuario.token = ''

        try {
            await usuario.save()
            res.json({ msg: 'Contraseña actualizada' })
        } catch (error) {
            console.log(error)
        }

    } else {
        const error = new Error("Token Incorrecto")
        res.status(404).json({ msg: error.message })
    }
}

const perfil = async (req, res) => {
    const { usuario } = req; // se lee del server
    req.json(usuario)
}


export {
    registrar,
    autenticar,
    confimrar,
    olvidePassword,
    comporbarToken,
    nuevoPassword,
    perfil
}