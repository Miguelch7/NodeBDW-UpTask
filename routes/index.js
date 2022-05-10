const express = require('express');
const router = express.Router();

// Importar el controlador
const { proyectosHome } = require('../controllers/proyectosController');

module.exports = function() {
    // Rutas
    router.get('/', proyectosHome);

    return router;
};
