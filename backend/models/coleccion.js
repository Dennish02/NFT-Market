import mongoose from 'mongoose'
 
const coleccionSchema = mongoose.Schema(
    {
        nombre:{
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        nfts:[{
            type: mongoose.Schema.Types.String,
            ref: 'NftCreated',
            autopopulate: true
        }]
    },
    {
        timestamps: true
    }
)

const Coleccion = mongoose.model('Coleccion', coleccionSchema)
export default Coleccion