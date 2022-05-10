import makeGeneratorIDRandom from "../middleware/idGenerator.js"
import NftCreated from "../models/nft.js"


const allNftUser= async (req, res)=>{
    const nftUserdb = await NftCreated.find().where('creatorId').equals(req.usuario)//trae todos los nf de la base de datos del usuario logueado
    res.json(nftUserdb)
}
const obtenerAllNft = async (req, res)=>{
    const nftAlldb = await NftCreated.find()//trae todos los nf de la base de datos
    try {
        
       return res.status(200).send(nftAlldb)
    } catch (error) {
        return res.status(404).json({msg: error.message})
    }
    
}
const crearNft = async (req, res)=>{
    //con req.usuario vamos a saber que usuario realizo el NFT
    const newNft= new NftCreated(req.body)//inatanciar nuevo nft  con la info que llega
    
    newNft.id= makeGeneratorIDRandom(4)
    newNft.creatorId = req.usuario.nombre//agrego el id del isuario al nft
    newNft.ownerId =req.usuario.nombre//el creador es el primer poseedor
    newNft.priceBase = req.body.price
    try {
        const nftSave = await newNft.save()
        res.json(nftSave) //para regresar la info creada y sincronizar
        
    } catch (error) {
        console.log(error)
    }  
}

const editarNft = async (req, res)=>{
    const { id } = req.params
    const {price}= req.body
    const oneNft = await NftCreated.findById(id)
    if(!oneNft){
        const error = new Error('No existe NFT')
        return res.status(401).json({msg: error.message})
    }
    if(oneNft.creatorId.toString()=== req.usuario._id.toString()){
        //si es el creador hay que dejarlo editar
        oneNft.price = price  || oneNft.price
        try {
           const nftActualizado =  await oneNft.save()   
            res.json({msg: 'NFT actualizado'})
        } catch (error) {
            console.log(error)
        }
    }else{
        const error = new Error('No puedes esitar este NFT')
        return res.status(401).json({msg: error.message})
    }

//cambo
}
const obtenerNft = async (req, res)=>{
    const { id } = req.params

    const nft = await NftCreated.findById(id)
    if(!nft) return res.status(404).json({msg: 'No encontrado'})
    res.send(nft)
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
    añadirFavNft,
    allNftUser,
    obtenerNft
}