const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req, res) => {

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
};

exports.formularioProyecto = async (req, res) => {
    
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
};

exports.nuevoProyecto = async (req, res) => {

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });

    // Validar que tengamos algo en el input
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
    };

    // Si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        });
    } else {
        // No hay errores
        // Insertar en la BD
        await Proyectos.create({ nombre, usuarioId });

        res.redirect('/');
    };
};

exports.proyectoPorUrl = async (req, res, next) => {
    
    const { url } = req.params;

    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

    const proyectoPromise = Proyectos.findOne({ where: { url, usuarioId } });

    const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise, proyectoPromise ]);

    const tareas = await Tareas.findAll({ where: { proyectoId: proyecto.id } });

    if (!proyecto) {
        return next();
    };

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto,
        tareas
    }); 
};

exports.formularioEditar = async (req, res, next) => {
    
    const { id } = req.params;
    
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

    const proyectoPromise = Proyectos.findOne({ where: { id, usuarioId } });

    const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise, proyectoPromise ]);

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
};

exports.actualizarProyecto = async (req, res) => {

    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });

    const { id } = req.params;
    // Validar que tengamos algo en el input
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
    };

    // Si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        });
    } else {
        // No hay errores
        // Insertar en la BD
        
        await Proyectos.update(
            { nombre }, 
            { where: { id } }
        );

        res.redirect('/');
    };
};

exports.eliminarProyecto = async (req, res, next) => {
    
    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

    if (!resultado) {
        return next();
    };

    res.status(200).send('El proyecto se ha eliminado correctamente.');
};
