import Coleccion from "../models/coleccion.js";

const obtenerColecciones = async (req, res) => {
  return res.json(await Coleccion.find());
};

const crearColeccion = async (req, res) => {
  const { name } = req.body;
  const creator = req.usuario.nombre;

  if (name.length > 8)
    return res
      .status(400)
      .send({ msg: "Las colecciones no pueden tener mas de 8 caracteres" });
  try {
    const existe = await Coleccion.findOne({ name });
    if (!existe) {
      const coleccion = new Coleccion({ creator, name });
      await coleccion.save();
      return res.send({ msg: "Coleccion creada" });
    } else {
      return res.status(400).send({ msg: "Ya existe la coleccion" });
    }
  } catch (e) {
    return res.status(400).send({ msg: "ocurrio un error" });
  }
};

const coleccionesUsuario = async (req, res) => {
  const colecciones = await Coleccion.find();

  const user = colecciones.filter((col) => col.creator === req.usuario.nombre);

  return res.json(user);
};

export { crearColeccion, obtenerColecciones, coleccionesUsuario };
