const mongoose = require('mongoose');

const validador = require('validator'); //validator de npm
const uniqueValidator = require('mongoose-unique-validator'); //validacion valor unico

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter the name']
    },
    
    password: {
        type: String,
        required: [true, 'You must enter the password'], 
        trim: true   
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validador.isEmail, 'The email is not valid']
    },
    
    image: {
        type: String,
        require: true,
        trim: true
    },
    
    token: {
        type: String,
    },
      
    confirmed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }

});

//aplicar el unique al schema
userSchema.plugin(uniqueValidator, { message: 'Error, {PATH} {VALUE} already exists' });

module.exports = mongoose.model('User', userSchema);