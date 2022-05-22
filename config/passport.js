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
            } catch (error) {
                // Ese usuario no existe
                return done(null, null, {
                    message: 'Esa cuenta no existe'
                });
            };
        }
    )
);
