const express = require('express');
const router = express.Router();
const respuesta = require('../../red/answers');
const controlador = require('./controlador');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await controlador.todos();
        respuesta.success(req, res, 200, users);
    } catch (error) {
        respuesta.error(req, res, 500, error.message);
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await controlador.uno(req.params.id);
        if (!user) {
            return respuesta.error(req, res, 404, 'Usuario no encontrado');
        }
        respuesta.success(req, res, 200, user);
    } catch (error) {
        respuesta.error(req, res, 500, error.message);
    }
});

// Registrar (crear) un nuevo usuario
router.post('/registrar', async (req, res) => {
    try {
        if (!req.body.nombre || !req.body.email || !req.body.password) {
            return respuesta.error(req, res, 400, 'Nombre, email y contraseña son requeridos');
        }
        const result = await controlador.registrar(req.body);
        respuesta.success(req, res, 201, { mensaje: 'Usuario registrado', id: result.insertId });
    } catch (error) {
        respuesta.error(req, res, 500, error.message);
    }
});

// Actualizar un usuario existente
router.put('/actualizar', async (req, res) => {
    try {
        if (!req.body.id) {
            return respuesta.error(req, res, 400, 'El ID es requerido para actualizar');
        }
        await controlador.actualizar(req.body);
        respuesta.success(req, res, 200, 'Usuario actualizado');
    } catch (error) {
        respuesta.error(req, res, 500, error.message);
    }
});

// Eliminar un usuario
router.delete('/eliminar', async (req, res) => {
    try {
        if (!req.body.id) {
            return respuesta.error(req, res, 400, 'El ID es requerido para eliminar');
        }
        await controlador.eliminar(req.body.id);
        respuesta.success(req, res, 200, 'Usuario eliminado');
    } catch (error) {
        respuesta.error(req, res, 500, error.message);
    }
});

// Login: autenticación de usuario
router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return respuesta.error(req, res, 400, 'Email y contraseña son requeridos');
        }
        const user = await controlador.login(req.body);
        respuesta.success(req, res, 200, user);
    } catch (error) {
        respuesta.error(req, res, 401, error.message);
    }
});

module.exports = router;
