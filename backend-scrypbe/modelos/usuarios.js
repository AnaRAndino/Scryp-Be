var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre: String,
        nombreUsuario : String,
        email : String,
        contrasenia:String,
        edad: Number,
        genero: String,
        almacenamiento : mongoose.Schema.Types.Mixed,        
        facturas: Number,
        proyectos: mongoose.Schema.Types.Mixed,
        snippes: mongoose.Schema.Types.Mixed,
        colaboradores: mongoose.Schema.Types.Mixed,
        proyectosCompartidos: mongoose.Schema.Types.Mixed
    }
);
//El primer parametro es el singular de la coleccion, 
//mediante este parametro hace el enlace,
//si se pone mal este parametro no se podria realizar ninguna instruccion
module.exports = mongoose.model('usuario',esquema);