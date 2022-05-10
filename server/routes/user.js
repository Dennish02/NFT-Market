const { Router } = require('express');

const userSchema = require('../models/user.js');

const user = Router();

//ruta prueba crear usuario
user.post('/register', (req, res) => {
    const user = userSchema(req.body);
    user.save()
    .then((data) => res.json(data))
    .catch((err) => res.json({error: err.message}))
    });

//ruta prueba para traer usuarios
user.get('/', (req, res) => {
    userSchema.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err.message))
});

//ruta prueba eliminar usuario
user.delete('/:id', (req, res) => {
    const { id } = req.params;
    userSchema.findByIdAndDelete(id)
    .then((data) => res.json(data))
    .catch(() => res.send('no se encontro el usuario'))
});

module.exports = user;