// Initialize the app and load the configuration
const express = require('express');

const config = require('./config');

const clientes = require('./modules/client/rutas');

const usuarios = require('./modules/users/rutas');

const app = express();

// Para usar express con json en el app
app.use(express.json());

// Configuracion
app.set('port', config.app.port);

// Routes
app.use('/api/clientes', clientes);

// Ruta usuario
app.use('/api/usuarios', usuarios);

// const alumno = {
//     nombre: 'Juan',
//     edad: 20,
//     cal: '9.7',
//     carrera: 'Ing. en Sistemas'
// }

// app.get('/api/alumno', function(req, res) {
//     res.json(alumno);
// })

// app.get('/api/alumno/eliminar', function(req, res) {
//     res.send('Hola soy alumno y quiero eliminar');
// })


module.exports = app;