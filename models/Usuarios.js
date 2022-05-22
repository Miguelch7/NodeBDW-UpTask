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
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcryptjs.hashSync( usuario.password, bcryptjs.genSaltSync(10) );
        }
    }
});
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;