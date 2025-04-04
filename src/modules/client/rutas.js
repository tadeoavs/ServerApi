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


// Obtener todos los clientes
router.get("/", async function (req, res) {
    try {
        const item = await controlador.todos()
        respuesta.success(req, res, 200, item)
    } catch (error) {
        console.error("Error al obtener clientes:", error); // Log para depuración
        respuesta.error(req, res, 500, error); // Pasa el error al cliente
    }
})

// Obtener un cliente por id
router.get('/:id', async (req, res) => {
    try {
        const cliente = await controlador.uno(req.params.id);
        if (!cliente || cliente.length === 0) {
            return respuesta.error(req, res, 404, 'Cliente no encontrado');
        }
        respuesta.success(req, res, 200, cliente);
    } catch (error) {
        respuesta.error(req, res, 500, error);
    }
});

// Agregar un nuevo cliente  
router.post('/agregar', async (req, res) => {
    try {
        await controlador.agregar(req.body);
        respuesta.success(req, res, 200, 'Cliente insertado');
    } catch (error) {
        respuesta.error(req, res, 500, error.message);
    }
});

// Actualizar un cliente existente  
// Se requiere que req.body incluya el id del cliente a actualizar
router.post('/actualizar', async (req, res) => {
    try {
        if (!req.body.id) {
            return respuesta.error(req, res, 400, 'El id es requerido para actualizar');
        }
        await controlador.actualizar(req.body);
        respuesta.success(req, res, 200, 'Cliente actualizado');
    } catch (error) {
        respuesta.error(req, res, 500, error);
    }
});

// Eliminar un cliente  
// Se requiere que req.body incluya el id del cliente a eliminar
router.post('/eliminar', async (req, res) => {
    try {
        if (!req.body.id) {
            return respuesta.error(req, res, 400, 'El id es requerido para eliminar');
        }
        await controlador.eliminar(req.body.id);
        respuesta.success(req, res, 200, 'Cliente eliminado');
    } catch (error) {
        respuesta.error(req, res, 500, error);
    }
});

module.exports = router;