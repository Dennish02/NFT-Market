import Coleccion from "../models/coleccion.js"

const crearColeccion = async (req, res) => {
    try{
        if(req.body.nombre.length > 8){
            res.status(400).send({ msg: "Las colecciones no pueden tener más de 8 caracteres"})
        }
        else{
            const coleccion = new Coleccion(req.body)
            await coleccion.save()
            var {usuario} = req
            usuario.colecciones.push(coleccion.nombre)
            await usuario.save()
            res.status(200).send(coleccion)
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const coleccionesDeUsuario = (req, res) => {
    try{
        res.status(200).send(req.usuario.colecciones)
    } catch (error) {
        res.status(404).send(error)
    }
}

export {
    crearColeccion,
    coleccionesDeUsuario
}