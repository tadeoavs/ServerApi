const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('usuarios OK');
});

router.get('update', function(req, res) {
    res.json('usuarios update OK');
});

module.exports = router;