const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// Importar helpers
const helpers = require('./helpers');

// Crear la conexión a la BD
const db = require('./config/db');

// Importar los modelos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado a la BD'))
    .catch(error => console.log(error));

// Crear una app de express
const app = express();

// Añadir carpeta pública
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Habilitar bodyParser para leer datos de formularios
app.use(bodyParser.urlencoded({extended: true}));

// Agregamos express validator a toda la aplicación
app.use( expressValidator() );

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Agregar flash messages
app.use( flash() );

// Agregar cookie parser
app.use(cookieParser());

// Agregar session
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));

// Pasar vardump a la app
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});

// Rutas
app.use('/', routes());

app.listen(process.env.SERVER_PORT);
