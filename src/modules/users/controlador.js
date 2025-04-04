const db = require('../../db/mysqluser');
const TABLA = 'usuario';

// Obtiene todos los usuarios
async function todos() {
    const result = await db.todos(TABLA);
    console.log('Obteniendo todos los usuarios:', result);
    return result;
}

// Obtiene un usuario por su ID
async function uno(id) {
    if (!id) {
        throw new Error('El ID es requerido');
    }
    const result = await db.uno(TABLA, id);
    console.log(`Obteniendo usuario con ID ${id}:`, result);
    return result;
}

// Registra un nuevo usuario
async function registrar(data) {
    if (!data.nombre || !data.email || !data.password) {
        throw new Error('Nombre, email y contraseña son requeridos');
    }

    const userData = {
        nombre: data.nombre,
        email: data.email,
        password: data.password 
    };

    const result = await db.insertar(TABLA, userData);
    console.log('Usuario registrado:', { ...userData, id: result.insertId });
    return result;
}

// Actualiza un usuario existente
async function actualizar(data) {
    if (!data.id) {
        throw new Error('El ID es requerido para actualizar');
    }

    const result = await db.actualizar(TABLA, data);
    console.log(`Usuario actualizado con ID ${data.id}:`, data);
    return result;
}

// Elimina un usuario por su ID
async function eliminar(id) {
    if (!id) {
        throw new Error('El ID es requerido para eliminar');
    }
    const result = await db.eliminar(TABLA, id);
    console.log(`Usuario eliminado con ID ${id}`);
    return result;
}


async function login(data) {
    if (!data.email || !data.password) {
        throw new Error('Email y contraseña son requeridos');
    }

    const user = await db.unoByEmail(TABLA, data.email);
    if (!user) {
        throw new Error('Ingrese usuario y contraseña valida');
    }

    if (data.password !== user.password) {
        throw new Error('Contraseña incorrecta');
    }

    console.log(`Usuario logueado con email ${data.email}`);
    return user;
}

module.exports = {
    todos,
    uno,
    registrar,
    actualizar,
    eliminar,
    login
};
