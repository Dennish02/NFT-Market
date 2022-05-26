import mongoose from "mongoose";

const notificacionSchema = mongoose.Schema({
    msg:{
        type: String,
        require: true,
        trim: true,
    },
    visto:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const Notificacion = mongoose.model('Notificacion', notificacionSchema)
export default Notificacion