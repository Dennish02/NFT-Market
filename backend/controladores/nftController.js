import makeGeneratorIDRandom from "../middleware/idGenerator.js";
import NftCreated from "../models/nft.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

const allNftUser = async (req, res) => {
  const { usuario } = req;

  let nfts = await usuario.nfts;

  res.json(nfts);
};

const obtenerAllNft = async (req, res) => {
  const nftAlldb = await NftCreated.find(); //trae todos los nf de la base de datos
  try {
    return res.status(200).send(nftAlldb);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

const crearNft = async (req, res) => {

  const newNft = new NftCreated(req.body); //inatanciar nuevo nft  con la info que llega
  newNft.id = makeGeneratorIDRandom(4);
  newNft.creatorId = req.usuario.nombre; //agrego el id del isuario al nft
  newNft.ownerId = req.usuario.nombre; //el creador es el primer poseedor
  newNft.priceBase = req.body.price;

  if (newNft.colection.length > 8) {
    res.status(400).send('Las colecciones no pueden tener más de 8 caracteres')
  }

  req.usuario.nfts.push(newNft);
  req.usuario.save();

  try {
    if (req.files.image) {
      const res = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      // console.log(res);
      const image = {
        url: res.secure_url,
        public_id: res.public_id,
      };
      newNft.image = image;
    }

    const nftSave = await newNft.save();
    res.json(nftSave); //para regresar la info creada y sincronizar
  } catch (error) {
    console.log(error);
  }
};

const editarNft = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  const oneNft = await NftCreated.findById(id);
  if (!oneNft) {
    const error = new Error("No existe NFT");
    return res.status(401).json({ msg: error.message });
  }
  if (oneNft.creatorId.toString() === req.usuario._id.toString()) {
    //si es el creador hay que dejarlo editar
    oneNft.price = price || oneNft.price;
    try {
      const nftActualizado = await oneNft.save();
      res.json({ msg: "NFT actualizado" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("No puedes esitar este NFT");
    return res.status(401).json({ msg: error.message });
  }

  //cambo
};
const obtenerNft = async (req, res) => {
  const { id } = req.params;

  const nft = await NftCreated.findById(id);
  if (!nft) return res.status(404).json({ msg: "No encontrado" });
  res.send(nft);
};
const regalarNft = async (req, res) => {};
const comprarNft = async (req, res) => {};
const venderNft = async (req, res) => {};
const añadirFavNft = async (req, res) => {};
const obtenerVentas = async (req, res) => {};

export {
  obtenerAllNft,
  crearNft,
  editarNft,
  regalarNft,
  comprarNft,
  venderNft,
  añadirFavNft,
  allNftUser,
  obtenerNft,
};
