var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        plan : String,
        cantidadProyectos : Number,
        cantidadSnippets: Number,
        precio: Number,
        idPlan:Number
    }
);

module.exports = mongoose.model('planes',esquema);