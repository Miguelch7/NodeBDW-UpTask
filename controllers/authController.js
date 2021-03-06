const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.usuarioAutenticado = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        return res.redirect('/iniciar-sesion');
    };
    
    return next();
};

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    });
};

exports.enviarToken = async (req, res) => {
    
    const { email } = req.body;

    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        return res.redirect('/reestablecer-password');
    };

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    await usuario.save();

    const resetUrl = `http://${ req.headers.host }/reestablecer-password/${ usuario.token }`;

    await enviarEmail.enviar({
        subject: 'Password Reset',
        archivo: 'reestablecer-password',
        usuario,
        url: resetUrl
    });

    req.flash('correcto', 'Te hemos enviado un email para reestablecer tu password!');
    res.redirect('/reestablecer-password');
};

exports.validarToken = async (req, res) => {
    
    const { token } = req.params;

    const usuario = await Usuarios.findOne({ where: { token } });

    if (!usuario) {
        req.flash('error', 'No es válido');
        res.redirect('/reestablecer-password');
    };

    res.render('generarPassword', {
        nombrePagina: 'Reestablecer contraseña'
    });
};
