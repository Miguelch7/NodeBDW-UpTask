const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo a autenticar
const Usuarios = require('../models/Usuarios');

// Local Strategy - Login con credenciales propias (Por default usuario y password)
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.find({
                    where: { email }
                });

                if (!usuario.verificarPassword(password)) {
                    // Password incorrecto
                    return done(null, false, {
                        message: 'Password Incorrecto'
                    });
                };

                return done(null, usuario);
            } catch (error) {
                // Ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                });
            };
        }
    )
);

// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;
