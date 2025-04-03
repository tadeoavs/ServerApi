

exports.error = function (req, res, status, msg) {
    const codestatus = status || 500
    const mensaje = msg || 'Error Interno'

    res.status(codestatus).send({
        status: codestatus,
        error: true,
        mensaje: mensaje,
        severity: 'error'

    })
}

exports.success = function (req, res, status, msg) {
    res.status(status).send({
        status: status,
        error: false,
        mensaje: msg,
        severity: 'success'
    })
}