import mongoose from "mongoose";

const TransaccionSchema = mongoose.Schema({
    actual_owner_Id:{
        type: mongoose.Schema.Types.String,
        ref: "Usuario",
        required: true
    },
    seller_Id:{
        type: mongoose.Schema.Types.String,
        ref: "Usuario",
        required: true
    },
    NFT_id:{
        type: mongoose.Schema.Types.String,
        ref: "NftCreated",
        required: true
    },
    NFT_colection:{
        type: mongoose.Schema.Types.String,
        ref: "NftCreated",
        required: true
    },
    transactionType:{
        type: String,
        required: true,
        enum: ['sale', 'gift', 'exchange']
    },
    price:{
        type: Number
    }
},{
    timestamps: true,
})

const Transaccion = mongoose.model("Transaccion", TransaccionSchema)
export default Transaccion;
