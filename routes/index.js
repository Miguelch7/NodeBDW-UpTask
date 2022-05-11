const express = require('express');
const router = express.Router();
// Importar express-validator
const { body } = require('express-validator/check');
// Importar el controlador
const { proyectosHome, formularioProyecto, nuevoProyecto } = require('../controllers/proyectosController');

module.exports = function() {
    // Rutas
    router.get('/', proyectosHome);
    router.get('/nuevo-proyecto', formularioProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        nuevoProyecto
    );

    return router;
};
