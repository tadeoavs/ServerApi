const db = require('../../db/mysql')

const TABLA = 'cliente'

function todos () {
    return db.todos(TABLA)
}

function uno () {

}

function add (data) {
    return db.add(TABLA, data)
}

function eliminar () {

}

module.exports = {
    todos,
    uno,
    add,
    eliminar
}