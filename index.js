const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
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

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir carpeta pública
app.use(express.static('public'));

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar vardump a la app
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

// Habilitar bodyParser para leer datos de formularios
app.use(bodyParser.urlencoded({extended: true}));

// Rutas
app.use('/', routes());

app.listen(process.env.SERVER_PORT);
