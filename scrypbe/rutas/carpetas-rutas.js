var express = require("express");
var carpeta = require("../modelos/carpetas");
var usuario = require("../modelos/usuarios");
var router = express.Router();


//Todas las carpetas del usuario logueado
router.get("/", function (req, res) {
    carpeta.find({ idUsuarioCreador: req.session.codigoUsuario, idCarpetaPadre: req.cookies.idCarpeta })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

//Todas las carpetas en las que el usuario colabora
router.get("/carpetas-compartidos", function (req, res) {
    carpeta.find({ "colaboradores._id": req.session.codigoUsuario})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

//Obtener las carpetas, de una carpeta en la que el usuario colabora
router.get("/compartidos", function (req, res) {
    carpeta.find({ "colaboradores._id": req.session.codigoUsuario, idCarpetaPadre: req.cookies.idCarpeta })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});





router.get("/carpetas-favoritos", function (req, res) {
    carpeta.find({ idUsuarioCreador: req.session.codigoUsuario, estadoDestacado: true })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

//Modifica el estado del proyecto una vez creado los archivos por default
router.put("/modificarEstadoProyectoNuevo/:idCarpeta", function (req, res) {
    carpeta.update(
        { idUsuarioCreador: req.session.codigoUsuario, _id: req.params.idCarpeta },
        { $set: { "estadoProyectoNuevo": false } }
    ).then(result => {
        res.send(result);
    })
        .catch(error => {
            res.send(error);
        });
});

router.put("/modificarEstadoDestacado", function (req, res) {
    carpeta.update(
        { idUsuarioCreador: req.session.codigoUsuario, _id: req.cookies.idCarpeta },
        { $set: { "estadoDestacado": true } }
    ).then(result => {
        res.send(result);
    })
        .catch(error => {
            res.send(error);
        });
});

router.put("/crearCarpeta", function (req, res) {
    var objCarpeta = new carpeta({
        idCarpetaPadre: req.cookies.idCarpeta,
        nombreCarpeta: req.body.nombreCarpeta,
        idUsuarioCreador: req.session.codigoUsuario,
        estadoCompartido: false,
        estadoDestacado: false,
        estadoColaboracion: false
    });

    objCarpeta.save().then(data => {

        usuario.update(
            { _id: req.session.codigoUsuario },
            {
                $push: {
                    carpetas: {
                        id: data._id,
                        idCarpetaPadre: req.cookies.idCarpeta,
                        nombreCarpeta: req.body.nombreCarpeta
                    }
                }
            }
        ).then(result => {
            res.send(result);
        }).catch(error => {
            res.send(error);
        });

    })
        .catch(error => {
            res.send(error);
        });
});


router.put("/compartir", function (req, res) {
    console.log(req.body.colaborador)
    
        usuario.find({ $or: [{ email: req.body.colaborador }, { nombreUsuario: req.body.colaborador }] }, { email: 1, nombreUsuario: 1 })
            .then(data => {
                if (data.length == 0) {
                    res.send({ estado: 0, mensaje: "Usuario inválido" })
                } else {
                    if (data[0]._id  == req.session.codigoUsuario)
                        res.send({ estado: 0, mensaje: "Usuario inválido" })
                    else{
                        carpeta.find({ _id: req.cookies.idCarpeta, "colaboradores._id": data[0]._id })
                        .then(resultado => {
 
                            if (resultado.length == 0) {
                                carpeta.update(
                                    { _id: req.cookies.idCarpeta },
                                    {
                                        $push: {
                                            colaboradores: {
                                                _id: data[0]._id,
                                                tipoAcceso: "editar"
                                            }
                                        }
                                    }
                                ).then(result => {
                                    res.send({ estado: 1, resultado: result });
                                }).catch(error => {
                                    res.send(error);
                                });
                               
                            } else {
                                res.send({ estado: 0, mensaje: "ya ha sido compartido con este usuario" });
                            }

                        }).catch(error => {
                            res.send(error);
                        })
                    }
                }
            })
            .catch(error => {
                res.send(error);
            });
    


});

//enviar informacion del proyecto al editor
router.get("/proyectoCarpeta", function (req, res) {
    carpeta.find({ $or: [{ idUsuarioCreador: req.session.codigoUsuario }, { "colaboradores._id": req.session.codigoUsuario }] })
        .then(data => {
            var datos = [];
            for (let i = 0; i < data[0].carpetas.length; i++) {
                if (data[0].carpetas[i]._id == req.cookies.idCarpeta)
                    datos.push(data[0].carpetas[i]);
            }
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});
module.exports = router;