import mongoose from "mongoose";

const TransaccionSchema = mongoose.Schema({
    owner_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    seller_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    NFT_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "NftCreated",
        required: true
    },
    transaction:{
        type: String,
        required: true,
        enum: ['sale', 'gift', 'exchange']
    },
    price:{
        type: Number,
        required: () => {
            if(this.transaction === 'sale') return true
            else return false
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true,
})

const Transaccion = mongoose.model("Transaccion", TransaccionSchema)
export default Transaccion;