var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));

app.post("/iniciar-sesion", function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true}, function (err, client) {
        if (err) {
            throw err;
        }

        var db = client.db('db_scrypt_be');
        var query = {correo: req.body.correo, contrasena: req.body.contrasena}
        // var query = {}
        var usuario = {}

        db.collection('usuarios').find(query).toArray(function (err, result) {
            if (err) {
                throw err;
            }            
            usuario = result;
            res.send(usuario);
            res.end();
        });
    });
});

app.listen(8002, function () {
    console.log("El servidor esta arriba");
});