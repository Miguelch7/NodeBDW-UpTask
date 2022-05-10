const express = require('express');
const routes = require('./routes');
const path = require('path');

// Crear una app de express
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir carpeta pública
app.use(express.static('public'));

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Rutas
app.use('/', routes());

app.listen(3000);
