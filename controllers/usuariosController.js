const Usuarios = require('../models/Usuarios');
const { Op } = require('sequelize');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    });
};

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;

    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión en UpTask',
        error
    });
};

exports.crearCuenta = async (req, res) => {

    // Leer los datos
    const { email, password } = req.body;

    try {
        // Crear el usuario
        await Usuarios.create({ email, password });

        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map( error => error.message ));
        res.render('crearCuenta', {
            nombrePagina: 'Crear Cuenta en UpTask',
            mensajes: req.flash(),
            email,
            password
        });
    };

};

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecerPassword', {
        nombrePagina: 'Reestablecer tu contraseña'
    });
};

exports.actualizarPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuarios.findOne({ 
        where: { 
            token, 
            expiracion: {
                [Op.gte]: Date.now()
            } 
        }
    });

    if (!usuario) {
        req.flash('error', 'No es válido');
        res.redirect('/reestablecer-password');
    };

    usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    await usuario.save();

    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
};
