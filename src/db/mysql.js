const config = require("../config");
const mysql = require("mysql2");

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if (err) {
            console.log("[BD err]", err);
            setTimeout(conMysql, 200);
        } else {
            console.log("BD conectada");
        }
    });
    conexion.on("error", (err) => {
        console.log("[BD error]", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            conMysql();
        } else {
            throw err;
        }
    });
}

conMysql();

function todos(TABLA) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${TABLA};`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function uno(TABLA, id) { }

function agregar(TABLA, data) {
    const datosdetabla = {
        tabla: TABLA,
        data: data,
    };
    return datosdetabla;
}

function eliminar(tabla, id) { }

function actualizar(table, id, data) { }

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    actualizar,
};
