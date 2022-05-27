import mongoose from "mongoose";

const tradeSchema = mongoose.Schema({
    userA:{
        type: mongoose.Schema.Types.String,
        ref: "Usuario",
        required: true
      },
    userB:{
        type: mongoose.Schema.Types.String,
        ref: "Usuario",
        required: true
      },
    nftA:{
        type: Object,
        required: true
    },
    nftB:{
        type: Object,
        required: true
    },
    nftA_id:{
        type: mongoose.Schema.Types.String,
        ref: "NftCreated",
        required: true
    },
    nftB_id:{
        type: mongoose.Schema.Types.String,
        ref: "NftCreated",
        required: true
    },
    condition:{
        type: String,
        required: true,
        enum: ['pending', 'rejected', 'accepted']
    },
    status:{
        type: Boolean,
        trim: true,
        default: true
    }
},{
    timestamps: true
})

const Trade = mongoose.model('Trade', tradeSchema)
export default Trade