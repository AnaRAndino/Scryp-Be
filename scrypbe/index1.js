var express = require('express');
var session = require("express-session");
var dbConfig = require('./modulos/db-config');
var usuario = require('./modelos/usuarios');

var bodyParser = require("body-parser");
var usuariosRutas = require('./rutas/usuarios-rutas');

var cors = require('cors');



//middlewares
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));



//Verificar si existe una variable de sesion para poner publica la carpeta public admin o cajero
// var publicCajero = express.static("../frontend-scrypbe/public-cajero");

//Implementar midleware que verifica si tiene acceso a las carpetas correspondientes utilizando las variables de sesion
app.use(
    function(req,res,next){
        if (req.session.correoUsuario){
            console.log("si");
        }
        else
            return next();
    }
);


app.post("/inciar-sesion", function(req, res){

    usuario.find({email:"abner@gmail.com", contrasenia:"asd.789"})
    .then(data=>{
        if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
            //Establecer las variables de sesion
            req.session.codigoUsuario = data[0]._id;
            req.session.correoUsuario = "abner@gmail.com";
            req.session.correoUsuario =  data[0].email;

            res.send({estado:0,mensaje:"Usuario autenticado con éxito", usuario:data[0], variable: req.session.correoUsuario});
        }else{
            res.send({estado:1,mensaje:"Credenciales inválidas"});
        }
        
    })
    .catch(error=>{
        res.send(error);
    }); 
});






app.get('/obtener-sesion',function(req, res){
    res.send("Sesion guardada: " + req.session.codigoUsuario);
});


app.listen(8003, function(){
    console.log("Servidor escuchando en el puerto 8003");
});