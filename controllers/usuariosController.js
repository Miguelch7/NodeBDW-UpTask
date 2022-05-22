const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    });
};

exports.crearCuenta = async (req, res) => {

    // Leer los datos
    const { email, password } = req.body;

    // Crear el usuario
    const usuario = await Usuarios.create({ email, password });

};
