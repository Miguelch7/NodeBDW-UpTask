const express = require('express');
const router = express.Router();

// Importar el controlador
const { proyectosHome, formularioProyecto, nuevoProyecto } = require('../controllers/proyectosController');

module.exports = function() {
    // Rutas
    router.get('/', proyectosHome);
    router.get('/nuevo-proyecto', formularioProyecto);
    router.post('/nuevo-proyecto', nuevoProyecto);

    return router;
};
