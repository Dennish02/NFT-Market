import NftCreated from "../models/nft.js"

const obtenerAllNft = async (req, res)=>{

}
const crearNft = async (req, res)=>{
    //con req.usuario vamos a saber que usuario realizo el NFT
    const newNft= new NftCreated(req.body)//inatanciar nuevo nft  con la info que llega
    newNft.creatorId = req.usuario._id//agrego el id del isuario al nft
    newNft.ownerId =req.usuario._id//el creador es el primer poseedor
    try {
        const nftSave = await newNft.save()
        res.json(nftSave) //para regresar la info creada y sincronizar
        
    } catch (error) {
        console,log(error)
    }  
}
const editarNft = async (req, res)=>{

}
const regalarNft = async (req, res)=>{

}
const comprarNft = async (req, res)=>{

}
const venderNft = async (req, res)=>{

}
const añadirFavNft = async (req, res)=>{

}
const obtenerVentas = async (req, res)=>{

}

export {
    obtenerAllNft,
    crearNft,
    editarNft,
    regalarNft,
    comprarNft,
    venderNft,
    añadirFavNft
}