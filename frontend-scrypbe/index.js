// Librias y modulos
var express = require("express");
var bodyParser = require("body-parser");

// Aplicacion
var app = express();

//Middlewares (Se ejecuta inmediantamente al iniciar el servidor)
//Midleware para poblar el JSON req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static("public"));


app.listen(8002, function () {
    console.log("El frontend esta en linea");
});