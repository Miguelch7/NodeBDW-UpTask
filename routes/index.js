const express = require('express');
const router = express.Router();
// Importar express-validator
const { body } = require('express-validator/check');
// Importar el controlador
const { 
    proyectosHome, 
    formularioProyecto, 
    nuevoProyecto, 
    proyectoPorUrl, 
    formularioEditar, 
    actualizarProyecto, 
    eliminarProyecto 
} = require('../controllers/proyectosController');

const {
    nuevaTarea,
    cambiarEstadoTarea,
    eliminarTarea
} = require('../controllers/tareasController');

module.exports = function() {
    // Home
    router.get('/', proyectosHome);

    // Proyectos
    router.get('/nuevo-proyecto', formularioProyecto); // Vista - Crear Proyecto
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        nuevoProyecto
    ); // Crear proyecto
    router.get('/proyectos/:url', proyectoPorUrl); // Listar proyecto
    router.get('/proyecto/editar/:id', formularioEditar); // Vista - Actualizar proyecto
    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        actualizarProyecto
    ); // Actualizar proyecto
    router.delete('/proyectos/:url', eliminarProyecto); // Eliminar proyecto

    // Tareas
    router.post('/proyectos/:url', nuevaTarea); // Crear tarea
    router.patch('/tareas/:id', cambiarEstadoTarea); // Actualizar tarea
    router.delete('/tareas/:id', eliminarTarea); // Actualizar tarea

    return router;
};
