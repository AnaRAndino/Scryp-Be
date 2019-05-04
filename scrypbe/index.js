var express = require("express");
var session = require("express-session");
var dbConfig = require('./modulos/db-config');
var usuario = require('./modelos/usuarios');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');
var usuariosRutas = require('./rutas/usuarios-rutas');
var carpetasRutas = require('./rutas/carpetas-rutas');
var archivosRutas = require('./rutas/archivos-rutas');

var app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
app.use("/usuarios",usuariosRutas);
app.use("/carpetas",carpetasRutas);
app.use("/archivos",archivosRutas);
app.use(express.static('public'));
app.use(fileUpload());



//Verificar si existe una variable de sesion para poner publica la carpeta public admin o cajero
var dashboard = express.static("dashboard");

//Implementar midleware que verifica si tiene acceso a las carpetas correspondientes utilizando las variables de sesion
app.use(
    function(req,res,next){
        if (req.session.correoUsuario){
            //Significa que el usuario si esta logueado
            dashboard(req,res,next);           
        }
        else
            return next();
            
    }
);


app.get('/logout',function(req,res){
    console.log("herelogout");
    req.session.destroy();
    //res.redirect("/");
    res.send({mensaje:"Fuera"});
});

app.get('/obtener-cookie-carpeta',function(req, res){
    res.send("Sesion guardada: " + req.cookies.idCarpeta);
});








app.post('/upload', function(req, res) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    let sampleFile = req.files.sampleFile;
    
  
    sampleFile.mv('./uploads/' + sampleFile.name, function(err) {
        if (err){
            return res.status(500).send(err);
        }
        res.redirect("/home.html");
    });
  });



//La siguiente es una peticion restringida, se envia una funcion midleware que verifica si esta autenticadoo no.

app.listen(8002);