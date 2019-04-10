var express = require('express');
var bodyParser = require("body-parser");
var database = require("./modulos/db-config");
var cors = require('cors');


var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


require('./rutas/usuarios-rutas')(app);
app.listen(8003, function(){
    console.log("Servidor escuchando en el puerto 8003");
});