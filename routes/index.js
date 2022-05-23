const express = require('express');
const router = express.Router();
// Importar express-validator
const { body } = require('express-validator/check');

// ProyectoController
const { 
    proyectosHome, 
    formularioProyecto, 
    nuevoProyecto, 
    proyectoPorUrl, 
    formularioEditar, 
    actualizarProyecto, 
    eliminarProyecto 
} = require('../controllers/proyectosController');

// Tarea Controller
const {
    nuevaTarea,
    cambiarEstadoTarea,
    eliminarTarea
} = require('../controllers/tareasController');

// Usuario Controller
const {
    formCrearCuenta,
    crearCuenta,
    formIniciarSesion,
    formRestablecerPassword
} = require('../controllers/usuariosController');

// Auth Controller
const {
    autenticarUsuario,
    usuarioAutenticado,
    cerrarSesion,
    enviarToken,
    reestablecerPassword
} = require('../controllers/authController');

module.exports = function() {
    // Home
    router.get('/', 
        usuarioAutenticado, 
        proyectosHome
    );

    // Crear proyecto
    router.get('/nuevo-proyecto', 
        usuarioAutenticado,
        formularioProyecto
    );
    router.post('/nuevo-proyecto',
        usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        nuevoProyecto
    );
    
    // Listar proyecto
    router.get('/proyectos/:url', 
        usuarioAutenticado,
        proyectoPorUrl
    );

    // Actualizar proyecto
    router.get('/proyecto/editar/:id', 
        usuarioAutenticado,
        formularioEditar
    );
    router.post('/nuevo-proyecto/:id',
        usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        actualizarProyecto
    );

    // Eliminar proyecto
    router.delete('/proyectos/:url', 
        usuarioAutenticado,
        eliminarProyecto
    );

    // Crear tarea
    router.post('/proyectos/:url', 
        usuarioAutenticado,
        nuevaTarea
    );

    // Actualizar tarea
    router.patch('/tareas/:id', 
        usuarioAutenticado,
        cambiarEstadoTarea
    );

    // Eliminar tarea
    router.delete('/tareas/:id', 
        usuarioAutenticado,
        eliminarTarea
    );

    // Crear cuenta
    router.get('/crear-cuenta', formCrearCuenta);
    router.post('/crear-cuenta', crearCuenta);

    // Iniciar sesión
    router.get('/iniciar-sesion', formIniciarSesion);
    router.post('/iniciar-sesion', autenticarUsuario);

    // Cerrar sesión
    router.get('/cerrar-sesion', cerrarSesion);

    // Reestablecer password
    router.get('/reestablecer-password', formRestablecerPassword);
    router.post('/reestablecer-password', enviarToken);
    router.get('/reestablecer-password/:token', reestablecerPassword);

    return router;
};
