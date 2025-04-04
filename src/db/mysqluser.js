const mysql = require('mysql2/promise');
const config = require('../config');

// Configuración de la conexión a la base de datos
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let conexion;

// Función para conectar a la base de datos
async function conMysql() {
    try {
        conexion = await mysql.createConnection(dbconfig);
        console.log('BD conectada (Tabla Usuarios)');
        conexion.on('error', async (err) => {
            console.error('[BD ERROR]', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log('Conexión perdida. Reconectando...');
                await conMysql();
            } else {
                throw err;
            }
        });
    } catch (error) {
        console.error('[BD ERROR]', error);
        setTimeout(conMysql, 2000);
    }
}

// Iniciar la conexión al cargar el módulo
conMysql();

// Obtiene todos los usuarios
async function todos(tabla) {
    const [result] = await conexion.query(`SELECT id, nombre, email, password FROM ${tabla}`);
    return result;
}

// Obtiene un usuario por su ID
async function uno(tabla, id) {
    const [result] = await conexion.query(`SELECT id, nombre, email, password FROM ${tabla} WHERE id = ?`, [id]);
    return result[0];
}

// Obtiene un usuario por su email (para el login)
async function unoByEmail(tabla, email) {
    const [result] = await conexion.query(`SELECT id, nombre, email, password FROM ${tabla} WHERE email = ?`, [email]);
    return result[0];
}

// Inserta un nuevo usuario
async function insertar(tabla, data) {
    const [result] = await conexion.query(`INSERT INTO ${tabla} SET ?`, [data]);
    return { insertId: result.insertId };
}

// Actualiza un usuario existente
async function actualizar(tabla, data) {
    const { id, ...datosActualizados } = data;
    const [result] = await conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [datosActualizados, id]);
    if (result.affectedRows === 0) {
        throw new Error(`No se encontró registro con el id ${id} para actualizar`);
    }
    return result;
}

// Elimina un usuario por su ID
async function eliminar(tabla, id) {
    const [result] = await conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
        throw new Error(`No se encontró registro con el id ${id} para eliminar`);
    }
    return result;
}

module.exports = { todos, uno, unoByEmail, insertar, actualizar, eliminar };
