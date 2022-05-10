import mongoose from "mongoose";

const nftSchema = mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      require: true,
    },
    colection: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
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
      type: String,
      require: true,
      trim: true,
    },
    priceBase: {
      type: Number,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    likes: {
      type: Number,
      trim: true,
    },
    avaliable: {
      type: Boolean,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const NftCreated = mongoose.model("NftCreated", nftSchema);
export default NftCreated;
