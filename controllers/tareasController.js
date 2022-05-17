const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.nuevaTarea = async (req, res, next) => {

    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

    const { tarea } = req.body;
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar tarea en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId });

    if (!resultado) {
        return next();
    };

    res.redirect(`/proyectos/${ req.params.url }`);
};

exports.cambiarEstadoTarea = async (req, res) => {

    const tarea = await Tareas.findOne({ where: { id: req.params.id } });

    let estado = 0;

    if ( tarea.estado === estado ) {
        estado = 1;
    };

    tarea.estado = estado;

    const resultado = await tarea.save();

    if ( !resultado ) {
        return next();
    };

    res.status(200).send('Actualizado');
};
