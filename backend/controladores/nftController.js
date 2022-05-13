import makeGeneratorIDRandom from "../middleware/idGenerator.js";
import NftCreated from "../models/nft.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import Usuario from "../models/Usuarios.js";

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
};
const obtenerNft = async (req, res) => {
  const { id } = req.params;

  const nft = await NftCreated.findById(id);
  if (!nft) return res.status(404).json({ msg: "No encontrado" });
  res.send(nft);
};
const regalarNft = async (req, res) => { // hago este comentario para meter el merge
  try {
    const { idnft, iduser, colection } = req.body
    const { usuario } = req
  
    let nft;
    usuario.nfts.forEach((currentValue, id) => {
      if (currentValue.id === idnft && currentValue.colection === colection) {
        nft = usuario.nfts[id];
        usuario.nfts = usuario.nfts.filter(item => {
        return item.id !== idnft
        })
      }
    });
  
    await usuario.save()
  
    const giftTo = await Usuario.findById(iduser);
  
    if (nft) {
      giftTo.nfts.push(nft);
      giftTo.save();

      res.status(200).json(giftTo.nfts);
    } else {
      res.status(404).send('this NFT does not exist')
    }  
  } catch (error) {
    res.status(400).send(error);
  }
};

const comprarNft = async (req, res) => {
  const { id } = req.params;
  const NFT = await NftCreated.findById(id);

    if (!NFT) {
      return res.status(401).json({ msg: "No existe NFT"});
    }
    else if (NFT.avaliable === false) {
      return res.status(401).json({ msg: "El NFT no esta a la venta" });
    }
    else if(req.usuario.coins < NFT.price) {
      return res.status(401).json({ msg: "No tienes CL suficientes para comprar este NFT" });
    }
    else if((req.usuario.coins >= NFT.price) && (NFT.avaliable === true)) {
      const precio = NFT.price;
      const vendedor_nombre = NFT.ownerId; //nombre
      const comprador_coins = req.usuario.coins;
      const vendedor =  await Usuario.findOne({ nombre: vendedor_nombre });  
      const vendedor_coins = vendedor.coins;
      const comprador = await Usuario.findOne({ nombre: req.usuario.nombre });
     //falta asociar con transacciones
     
      try {
          
           vendedor.coins = vendedor.coins + precio;
           const nftFiltrados = vendedor.nfts.filter((nft) => (nft._id !== NFT._id));
           vendedor.nfts = nftFiltrados;
           await vendedor.save();
           NFT.ownerId = comprador.nombre;
           await NFT.save();
           comprador.coins = comprador.coins - precio;
           comprador.nfts.push(NFT)
           await comprador.save();
           
           res.json({ msg: "Su compra fue realizada" });
      } catch (error) {
         //si arroja algun error se devuelve todo a sus valores iniciales
           vendedor.coins = vendedor_coins;
           vendedor.nfts.push(NFT)
           await vendedor.save();
           NFT.ownerId = vendedor.nombre;
           await NFT.save();
           comprador.coins = comprador_coins;
           const nftFiltrados = comprador.nfts.filter((nft) => (nft._id !== NFT._id));
           comprador.nfts = nftFiltrados;
           await comprador.save();
  
           return res.status(401).json({ msg: "Lo sentimos, su compra no pudo realizarse" });
      } 
    }
  
};

const venderNft = async (req, res) => {
  const { id } = req.params;
  try {
    const Nft = await NftCreated.findById(id);
    if (!Nft) {
       return res.status(401).json({msg: "No existe NFT" });
    }
    else if (Nft.ownerId === req.usuario.nombre) {
       Nft.avaliable = !Nft.avaliable
       await Nft.save();
       res.json({ msg: "NFT actualizado" });
    }
    else {
      return res.status(401).json({ msg: "No puedes editar este NFT" });
    }
  } catch (error) {
    console.log(error);
  }  
};
const añadirFavNft = async (req, res) => {

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
  allNftUser,
  obtenerNft,
};
