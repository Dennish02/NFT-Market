import mongoose from "mongoose";
import bcrypt from 'bcrypt';



const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    password:{
        type: String,
        require: true,
        trim: true,    
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique:true,
    },
    token:{
        type: String,
    },
    confirmado:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

//antes de almacenar 
usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();//si no se cambio la cpntraseña no se jace nada
    }
    const salt = await bcrypt.genSalt(10)//rondas
    this.password = await bcrypt.hash(this.password, salt)

})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)//compara las pasword
}

 const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario;