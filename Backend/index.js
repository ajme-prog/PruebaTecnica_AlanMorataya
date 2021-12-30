const express = require("express");
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const { response } = require("express");
const { json } = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors())

//----importo mis rutas
const endpointsusuarios = require('./routes/routes.js');

app.use('', endpointsusuarios);
// Primero traemos nuestra base de datos
app.get('/GetUsuarios', function (req, res) {
    res.send('[GET]Saludos desde express');
  });





app.listen(5000, () => {
 console.log("Iniciando app de Prueba Técnica  en el puerto 5000");
});