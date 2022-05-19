import mongoose from "mongoose";

const nftSchema = mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      required: true,
    },
    colection: {
      type: mongoose.Schema.Types.String,
      ref: "Coleccion",
    },
    category: {
      type: mongoose.Schema.Types.String,
      ref: "Categorias",
    },
    creatorId: {
      type: mongoose.Schema.Types.String,
      ref: "Usuario",
    },
    ownerId: {
      type: mongoose.Schema.Types.String,
      ref: "Usuario",
    },
    image: {
      public_id: String,
      url: String,
    },
    priceBase: {
      type: Number,
      trim: true,
      required: true,
    },
    lastPrice: {
      type: Number,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    ranking: {
      type: Number,
      trim: true,
      default: 0
    },
    userLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
      }
    ],
    avaliable: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const NftCreated = mongoose.model("NftCreated", nftSchema);
export default NftCreated;
