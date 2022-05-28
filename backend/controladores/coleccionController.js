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
      .send({ msg: "the collections can't have more than 8 characters" });
  try {
    const existe = await Coleccion.findOne({ name });
    if (!existe) {
      const coleccion = new Coleccion({ creator, name });
      await coleccion.save();
      return res.send({ msg: "Collection created" });
    } else {
      return res.status(400).send({ msg: "The collection is already exist" });
    }
  } catch (e) {
    return res.status(400).send({ msg: "An error occurred" });
  }
};

const coleccionesUsuario = async (req, res) => {
  const colecciones = await Coleccion.find();

  const user = colecciones.filter((col) => col.creator === req.usuario.nombre);

  return res.json(user);
};

export { crearColeccion, obtenerColecciones, coleccionesUsuario };
