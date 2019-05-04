var express = require("express");
var usuario = require("../modelos/usuarios");
var carpeta = require("../modelos/carpetas");
var archivo = require("../modelos/archivos");
var router = express.Router();



//crea los tres archivos por defecto cuando el proyecto es nuevo
router.post("/crearArchivos/:idCarpetaPadre", function (req, res) {
    archivo.insertMany([
        {
            idCarpetaContenedora: req.params.idCarpetaPadre,
            nombreArchivo: "index",
            idUsuarioCreador: req.session.codigoUsuario,
            contenido: "",
            extension: "html",
            estadoCompartido: false,
            estadoDestacado: false,
            estadoColaboracion: false
        }
            , {
            idCarpetaContenedora: req.params.idCarpetaPadre,
            nombreArchivo: "estilos",
            idUsuarioCreador: req.session.codigoUsuario,
            contenido: "",
            extension: "css",
            estadoCompartido: false,
            estadoDestacado: false,
            estadoColaboracion: false
        }
            , {
            idCarpetaContenedora: req.params.idCarpetaPadre,
            nombreArchivo: "controlador",
            idUsuarioCreador: req.session.codigoUsuario,
            contenido: "",
            extension: "js",
            estadoCompartido: false,
            estadoDestacado: false,
            estadoColaboracion: false
        }
    ])   .then(result => {
        res.send(result);
    })
        .catch(error => {
            res.send(error);
        });
});


router.get("/", function (req, res) {
    archivo.find({ idUsuarioCreador: req.session.codigoUsuario,idCarpetaContenedora: req.cookies.idCarpeta })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

router.get("/cargar-archivos-project", function (req, res) {
    archivo.find({idCarpetaContenedora: req.cookies.idCarpeta })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

router.get("/archivos-compartidos", function (req, res) {
    archivo.find({idCarpetaContenedora: req.cookies.idCarpeta })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});


router.put("/modificarContenidoArchivo", function (req, res) {
    archivo.update(
        { $or: [{ idUsuarioCreador: req.session.codigoUsuario },{"colaboradores._id":req.session.codigoUsuario}], _id: req.body.idArchivo},
        { $set: { "contenido": req.body.contenido } }
    ).then(result => {
        res.send(result);
    })
        .catch(error => {
            res.send(error);
        });
});
module.exports = router;