var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    { 
        firabaseId: String,
        nombreUsuario: String,
        nombre: String,
        email: String,
        contrasenia:String,
        edad: Number,
        genero: String,
        pais: String,
        almacenamiento :  {
                idPlan:Number,
                cantidadProyectosDisponibles:Number
        },        
        facturas: Number,
        proyectos: [{
			idProyecto:  mongoose.Schema.Types.ObjectId,
			nombreProyecto: String,
			idCarpetaMain: String
		}],
	    carpetas: [{
            _id:mongoose.Schema.Types.ObjectId,
            idCarpetaPadre: String,
            nombreCarpeta: String,
        }],
        archivos:[{
            idArchivo:mongoose.Schema.Types.ObjectId,
            idCarpetaContenedora: String,
            nombreArchivo: String,
            contenido: String,
            extension: String
        }],
        snippets:[{
            id:mongoose.Schema.Types.ObjectId,
            idCarpetaContenedora: String,
            nombre: String,
            contenido: String,
            lenguaje: String,
            extension: String
        }],
	
    }
);
//El primer parametro es el singular de la coleccion, 
//mediante este parametro hace el enlace,
//si se pone mal este parametro no se podria realizar ninguna instruccion
module.exports = mongoose.model('usuario',esquema);