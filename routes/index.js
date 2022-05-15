const express = require('express');
const router = express.Router();
// Importar express-validator
const { body } = require('express-validator/check');
// Importar el controlador
const { proyectosHome, formularioProyecto, nuevoProyecto, proyectoPorUrl, formularioEditar, actualizarProyecto, eliminarProyecto } = require('../controllers/proyectosController');

module.exports = function() {
    // Rutas
    router.get('/', proyectosHome);
    router.get('/nuevo-proyecto', formularioProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        nuevoProyecto
    );

    router.get('/proyectos/:url', proyectoPorUrl); // Listar proyecto
    router.get('/proyecto/editar/:id', formularioEditar); // Actualizar proyecto
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        actualizarProyecto
    );
    router.delete('/proyectos/:url', eliminarProyecto);

    return router;
};
