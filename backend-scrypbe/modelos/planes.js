var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        codigoPlan: number,
        tipoPlan : String,
        sucripcion : String,
        costo: Number,
        cantAlmacenamiento: String
    }
);

module.exports = mongoose.model('planes',esquema);