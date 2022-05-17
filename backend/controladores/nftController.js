import makeGeneratorIDRandom from "../middleware/idGenerator.js";
import NftCreated from "../models/nft.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import Usuario from "../models/Usuarios.js";
import Coleccion from "../models/coleccion.js";

const allNftUser = async (req, res) => {
  const { usuario } = req;

  let nfts = await usuario.nfts;

  res.json(nfts);
};

const obtenerAllNft = async (req, res) => {
  const nftAlldb = await NftCreated.find(); //trae todos los nf de la base de datos
  try {
    return res.status(200).json({ nftAlldb, usuario: req.usuario });
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
    return res
    .status(400)
    .send({ msg: "Las colecciones no pueden tener más de 8 caracteres" });
  }

  if (newNft.colection.length <= 0) {
    return res
      .status(400)
      .send({ msg: "Las colecciones deben tener al menos 1 carácter" });
  }

  if (newNft.category.length <= 0) {
    return res
    .status(400)
    .send({ msg: "Los nfts deben pertenecear a una categoría" });
  }

  if (newNft.price <= 0) {
    return res.status(400).send({ msg: "El precio debe ser mayor a 0" });
  }
  
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

    req.usuario.nfts.push(newNft);
    req.usuario.save();
    //agrego el nft a la colección
    const coleccion = await Coleccion.findOne({nombre: req.body.colection})
    coleccion.nfts.push(newNft.id)
    await coleccion.save()
    const nftSave = await newNft.save();
    res.json(nftSave); //para regresar la info creada y sincronizar
  } catch (error) {
    console.log(error);
  }
};

const editarNft = async (req, res) => {
  //manejar errores.

  const { id } = req.params;
  const { price } = req.body;
  const { usuario } = req;
  const oneNft = await NftCreated.findById(id);

  if (oneNft.length === 0) {
    const error = new Error("el NFT no existe");
    return res.status(401).json({ msg: error.message });
  }
  if (oneNft.ownerId === req.usuario.nombre) {
    if (price <= 0) {
      return res
        .status(400)
        .json({ msg: "The NFT price must be at least greater than 0CL" });
    }
    oneNft.price = price || oneNft.price;
    try {
      await oneNft.save();

      let filterNft = usuario.nfts.filter(
        (nft) => nft.id !== oneNft.id || nft.colection !== oneNft.colection
      );

      usuario.nfts = filterNft;

      usuario.nfts.push(oneNft);

      await usuario.save();

      res.json({ msg: "NFT actualizado" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error(
      "No puedes editar este NFT porque no eres el dueño"
    );
    return res.status(401).json({ msg: error.message });
  }
};
const obtenerNft = async (req, res) => {
  let { id } = req.params;

  const nft = await NftCreated.findById(id);
  if (!nft) return res.status(404).json({ msg: "No encontrado" });

  res.send(nft);
};
const regalarNft = async (req, res) => {
  // hago este comentario para meter el merge
  try {
    const { idnft, iduser, colection } = req.body;
    const { usuario } = req;

    let nft;
    usuario.nfts.forEach((currentValue, id) => {
      if (currentValue.id === idnft && currentValue.colection === colection) {
        nft = usuario.nfts[id];
        usuario.nfts = usuario.nfts.filter((item) => {
          return item.id !== idnft;
        });
      }
    });

    await usuario.save();

    const giftTo = await Usuario.findById(iduser);

    if (nft) {
      giftTo.nfts.push(nft);
      giftTo.save();

      res.status(200).json(giftTo.nfts);
    } else {
      res.status(404).send("this NFT does not exist");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const comprarNft = async (req, res, next) => {
  const { id } = req.params;
  const NFT = await NftCreated.findById(id);
  if (!NFT) {
    return res.status(401).json({ msg: "No existe NFT" });
  } else if (NFT.avaliable === false) {
    return res.status(401).json({ msg: "El NFT no esta a la venta" });
  } else if (req.usuario.coins < NFT.price) {
    return res
      .status(401)
      .json({ msg: "No tienes CL suficientes para comprar este NFT" });
  } else if (req.usuario.coins >= NFT.price && NFT.avaliable === true) {
    const precio = NFT.price;
    const vendedor_nombre = NFT.ownerId; //nombre
    const comprador_coins = req.usuario.coins;
    const vendedor = await Usuario.findOne({ nombre: vendedor_nombre });
    const vendedor_coins = vendedor.coins;
    const comprador = await Usuario.findOne({ nombre: req.usuario.nombre });

    try {
      vendedor.coins = vendedor.coins + precio;
      const nftFiltrados = vendedor.nfts.filter(
        (nft) => nft.id !== NFT.id || nft.colection !== NFT.colection
      );
      vendedor.nfts = nftFiltrados;
      await vendedor.save();
      NFT.ownerId = comprador.nombre;
      NFT.avaliable = false;
      NFT.lastPrice = precio;
      await NFT.save();
      comprador.coins = comprador.coins - precio;
      comprador.nfts.push(NFT);
      await comprador.save();

      const data = {
        actual_owner_Id: comprador.nombre,
        seller_Id: vendedor.nombre,
        NFT_id: NFT.id,
        NFT_colection: NFT.colection,
        transactionType: "sale",
        price: precio,
      };

      req.data = data;
      return next();
    } catch (error) {
      //si arroja algun error se devuelve todo a sus valores iniciales
      vendedor.coins = vendedor_coins;
      vendedor.nfts.push(NFT);
      await vendedor.save();
      NFT.ownerId = vendedor.nombre;
      await NFT.save();
      comprador.coins = comprador_coins;
      const nftFiltrados = comprador.nfts.filter(
        (nft) => nft.id !== NFT.id || nft.colection !== NFT.colection
      );
      comprador.nfts = nftFiltrados;
      await comprador.save();

      return res
        .status(401)
        .json({ msg: "Lo sentimos, su compra no pudo realizarse" });
    }
  }
  // res.status(200).json(transaccion);
};

const venderNft = async (req, res) => {
  const { id } = req.params;

  try {
    const Nft = await NftCreated.findById(id);
    if (!Nft) {
      return res.status(401).json({ msg: "No existe NFT" });
    } else if (Nft.ownerId === req.usuario.nombre) {
      Nft.avaliable = !Nft.avaliable;
      await Nft.save();

      req.usuario.nfts.forEach((nft) =>
        nft._id.toString() === id ? (nft.avaliable = !nft.avaliable) : null
      );

      await Usuario.findOneAndUpdate({ _id: req.usuario._id }, req.usuario);

      res.json({ msg: "NFT actualizado" });
    } else {
      return res.status(401).json({ msg: "No puedes editar este NFT" });
    }
  } catch (error) {
    console.log(error);
  }
};

const añadirFavNft = async (req, res) => {
  const { id } = req.params;
  try {
     const NFT = await NftCreated.findById(id);
     const user = await Usuario.findOne({ nombre: req.usuario.nombre }).populate("favoritos"); //populate trae la data de la referencia
     const nftFav = user.favoritos.find(nft => nft.id === NFT.id && nft.colection === NFT.colection);
     if(nftFav) {
        res.json({msg: `${NFT.id} ya está en sus favoritos`})
     } else {
        user.favoritos.push(NFT);
        await user.save();
        res.json({msg: `${NFT.id} fue agregado a favoritos`})
     }
     
  } catch (error) {
    console.log(error);
  }
};

const eliminarFavNft = async (req, res) => {
  const { id } = req.params;
  try {
     const NFT = await NftCreated.findById(id);
     const user = await Usuario.findOne({ nombre: req.usuario.nombre }).populate("favoritos");
     const favFiltrados = user.favoritos.filter(nft => nft.id !== NFT.id || nft.colection !== NFT.colection);
     user.favoritos = favFiltrados;
     await user.save();
     res.json({msg: `${NFT.id} fue eliminado de favoritos`})
  } catch (error) {
    console.log(error);
  }
};

const obtenerVentas = async (req, res) => {};

export {
  obtenerAllNft,
  crearNft,
  editarNft,
  regalarNft,
  comprarNft,
  venderNft,
  añadirFavNft,
  eliminarFavNft,
  allNftUser,
  obtenerNft,
};
