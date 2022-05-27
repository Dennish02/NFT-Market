import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    coins: {
      type: Number,
      trim: true,
      default: 1000,
    },
    nfts: {
      type: Array,
    },
    favoritos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "NftCreated",
    }]
    ,
    nftLikes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "NftCreated",
    }],
    transacciones: {
      type: Array,
    },
    hasTradeOffers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trade",
    }],
    portfolioValue: {
      type: Number,
      default: 0
    },
    notificaciones: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notificacion"
    }]
  },

  {
    timestamps: true,
  }
);

//antes de almacenar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); //si no se cambio la contraseña no se hace nada
  }
  const salt = await bcrypt.genSalt(10); //rondas
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password); //compara las pasword
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
