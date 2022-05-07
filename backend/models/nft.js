import mongoose from "mongoose";

const nftSchema = mongoose.Schema({
    colection:{
        type: String,
        trim: true,
        required: true,
    },
    category:{
        type: String,
        trim: true,
        required: true,
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    price:{
        type: Number,
        trim: true,
        required: true,
    }
},{
    timestamps: true,
})

const NftCreated = mongoose.model("NftCreated", nftSchema)
export default NftCreated;