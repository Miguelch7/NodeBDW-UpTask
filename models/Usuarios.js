const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcryptjs = require('bcryptjs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        },
        validate: {
            isEmail: {
                msg: 'Agrega un email válido'
            },
            notEmpty: {
                msg: 'El email no puede ir vacío'
            }
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacío'
            }
        }
    }
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcryptjs.hashSync( usuario.password, bcryptjs.genSaltSync(10) );
        }
    }
});
Usuarios.hasMany(Proyectos);

// Metodos personalizados
Usuarios.prototype.verificarPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
};

module.exports = Usuarios;