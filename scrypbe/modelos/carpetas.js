var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {     
				idCarpetaPadre: String,
				nombreCarpeta: String,
				idUsuarioCreador: mongoose.Schema.Types.ObjectId,
				estadoCompartido: Boolean,
				estadoDestacado: Boolean,
				estadoColaboracion: Boolean,
				estadoProyectoNuevo: Boolean,
				colaboradores: [{
							_id: mongoose.Schema.Types.ObjectId,
							tipoAcceso: String
						}]
		
    }
);
//El primer parametro es el singular de la coleccion, 
//mediante este parametro hace el enlace,
//si se pone mal este parametro no se podria realizar ninguna instruccion
module.exports = mongoose.model('carpeta',esquema);