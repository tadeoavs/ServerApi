const express = require('express');
const router = express.Router();
const respuesta = require('../../red/answers');
const controlador = require('./controlador');

// router.get('/', function(req, res) {
//     res.send('Clientes OK');
// });


// router.get('/update', function(req, res) {
//     respuesta.success(req, res, 200, 'Conexion Correcta')
// });

// Error
// router.get('/update', function(req, res) {
//     respuesta.success(req, res, 500,)
// });

router.get("/", async function (req, res) {
    try {
        const item = await controlador.todos()
        respuesta.success(req, res, 200, item)
    } catch (error) {
        console.error("Error al obtener clientes:", error); // Log para depuración
        respuesta.error(req, res, 500, error); // Pasa el error al cliente
    }
})

router.get("/update", function (req, res) {
    res.send("Cliente actualizado");
})

router.post('/agregar', function (req, res) {
    const agregar = controlador.agregar(req.body)
    respuesta.success(req, res, 200, agregar)
})

module.exports = router;