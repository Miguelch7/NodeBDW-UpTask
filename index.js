const express = require('express');
const routes = require('./routes');

// Crear una app de express
const app = express();

// Rutas
app.use('/', routes());

app.listen(3000);
