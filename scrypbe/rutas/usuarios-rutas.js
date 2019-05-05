var express = require("express");
var usuario = require("../modelos/usuarios");
var carpeta = require("../modelos/carpetas");
var archivo = require("../modelos/archivos");
var plan = require("../modelos/planes");
var router = express.Router();



//***********************USUARIOS************************* */

router.get('/obtener-sesion', function (req, res) {
    res.send("Sesion guardada: " + req.session.codigoUsuario + req.session.correoUsuario);
});


router.post("/inciar-sesion", function (req, res) {
    usuario.find({ email: req.body.correo})
        .then(data => {
            if (data.length == 1) {//Significa que si encontro un usuario con las credenciales indicadas
                //Establecer las variables de sesion  
                console.log(data[0].almacenamiento)
                req.session.codigoUsuario = data[0]._id;
                req.session.correoUsuario = data[0].email;
                res.cookie("idCarpeta", 0);
                res.cookie("cantDisponibles", data[0].almacenamiento.cantidadProyectosDisponibles);
                res.send({ estado: 0, mensaje: "Usuario autenticado con éxito", usuario: data[0] });

            } else {
                res.send({ estado: 1, mensaje: "Credenciales inválidas" });
            }
        })
        .catch(error => {
            res.send(error);
        });
});



/*--------------------registrar usuario--------------- */
router.post('/registrar-usuario', function (req, res) {
    //consulta para verificar que no existe el usuario
    usuario.find({ email: req.body.email }, { email: 1 })
        .then(data => {
            if (data.length == 0) {
                var objUsuario = new usuario({
                    firabaseId: req.body.firebaseId,
                    nombreUsuario: req.body.nombreUsuario, nombre: req.body.nombre,
                    email: req.body.email, contrasenia: req.body.contrasenia,
                    edad: 0, genero: "x",
                    almacenamiento: {
                        idPlan: 1, tipoPlan: "Free", cantidadProyectosDisponibles: 10
                    },
                    facturas: 0
                });
                objUsuario.save()
                    .then(obj => {
                        res.send({ estatus: 0, mensaje: "Registro Exitoso", respuesta: obj })
                    })
                    .catch(error => {
                        res.send(error);
                    });
            } else
                res.send({ estatus: 1, mensaje: "Ya hay una cuenta con este correo." });

        })
        .catch(error => {
            res.send(error);
        });
});

router.delete('/eliminar-usuario', function (req, res) {
    res.send({ Mensaje: "Eliminar usuario" });
});




/*--------------------consultar perfil de usuario--------------- */
router.get('/consultar-perfil', function (req, res) {
    console.log("dentro consulta");
    usuario.find({ _id: req.session.codigoUsuario }, { nombre: 1, nombreUsuario: 1, email: 1, edad: 1, genero: 1, pais: 1 })
        .then(data => {
            res.send(data[0]);
        })
        .catch(error => {
            res.send(error);
        });

});


/*--------------------actualizar perfil usuario--------------- */
router.put("/actualizar-perfil", function (req, res) {
    usuario.update(
        { _id: req.session.codigoUsuario },
        {
            $set: {
                nombre: req.body.nombre,
                nombreUsuario: req.body.nombreUsuario,
                email: req.body.email,
                edad: req.body.edad,
                genero: req.body.genero,
                pais: req.body.pais
            }
        }
    ).then(result => {
        res.send(result);
    })
        .catch(error => {
            res.send(error);
        });
});


/*--------------------actualizar contrasenia usuario--------------- */
router.put("/contrasenia", function (req, res) {
    usuario.update(
        { _id: req.session.codigoUsuario },
        {
            $set: {
                contrasenia: req.body.contrasenia
            }
        }
    ).then(result => {
        res.send(result);
    })
        .catch(error => {
            res.send(error);
        });
});


// ----------------------------------Plan-------------------------//


router.get("/planes", function (req, res) {
    plan.find({})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

router.put("/contratarPlan/:idPlan", function (req, res) {
    plan.find({ idPlan: parseInt(req.params.idPlan) })
        .then(data => {
            var cantidadDisponiblesNuevo = data[0].cantidadProyectos
            res.cookie("cantDisponibles", cantidadDisponiblesNuevo);
            usuario.update({ _id: req.session.codigoUsuario },
                {
                    $set: {
                        "almacenamiento.idPlan": req.params.idPlan,
                        "almacenamiento.cantidadProyectosDisponibles": cantidadDisponiblesNuevo
                    }
                })
                .then(result => {
                    res.send(result);
                })
                .catch(error => {
                    res.send(error);
                });
        })
        .catch(error => {
            res.send(error);
        });


});


/*--------------------Consultar snippets del usuario--------------- */


router.get("/snippets", function (req, res) {
    usuario.find({ _id: req.session.codigoUsuario }, { snippets: 1 })
        .then(data => {

            res.send(data[0]);
        })
        .catch(error => {
            res.send(error);
        });
});


router.get("/cargarSnippet", function (req, res) {
    usuario.find({ _id: req.session.codigoUsuario }, { snippets: 1 })
        .then(data => {
            var datos = [];
            for (let i = 0; i < data[0].snippets.length; i++) {
                if (data[0].snippets[i].idCarpetaContenedora == req.cookies.idCarpeta)
                    datos.push(data[0].snippets[i]);
                console.log("test")
            }
            res.send(datos);
        })
        .catch(error => {
            res.send(error)
        })
});



router.put("/modificarContenidoSnippet", function (req, res) {
    console.log(req.body.idSnippet);
    console.log(req.session.codigoUsuario);
    console.log(req.body.contenido);
    usuario.update({ _id: req.session.codigoUsuario, "snippets._id": req.body.idSnippet }, { $set: { "snippets.$.contenido": req.body.contenido } })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        });
});

router.put("/crearSnippet", function (req, res) {
    usuario.update({ _id: req.session.codigoUsuario },
        {
            $push: {
                snippets: {
                    idCarpetaContenedora: req.cookies.idCarpeta,
                    nombre: req.body.titulo,
                    contenido: req.body.contenido,
                    lenguaje: req.body.lenguaje,
                    extension: req.body.extension
                }
            }
        }
    ).then(result => {
        console.log(result)
        res.send(result);
    })
        .catch(error => {
            res.send(error);
        });
});







//***********************CARPETAS,ARCHIVOS************************* */
//db.usuarios.find({"_id" : ObjectId("5ca917b691dcb4294c61cd37")},{carpetas:1}).pretty()




router.put("/crearProyecto", function (req, res) {

    usuario.find({ _id: req.session.codigoUsuario }, { "almacenamiento.cantidadProyectosDisponibles": 1 })
        .then(data => {

            if (data[0].almacenamiento.cantidadProyectosDisponibles > 0) {

                // // Crea carpeta en la colección de carpetas
                var objCarpeta = new carpeta({
                    idCarpetaPadre: req.cookies.idCarpeta,
                    nombreCarpeta: req.body.nombreProyecto,
                    idUsuarioCreador: req.session.codigoUsuario,
                    estadoCompartido: false,
                    estadoDestacado: false,
                    estadoColaboracion: false,
                    estadoProyectoNuevo: true //bandera que me indica si es una carpeta main y si es Nuevo para crear 3 archivos default
                });

                objCarpeta.save()
                    .then(data => {
                        // Crear carpeta en la colección de usuarios
                        usuario.update(
                            { _id: req.session.codigoUsuario },
                            {
                                $push: {
                                    carpetas: {
                                        _id: data._id,
                                        idCarpetaPadre: req.cookies.idCarpeta,
                                        nombreCarpeta: req.body.nombreProyecto
                                    }
                                }
                            }
                        ).then(result => {
                            //crear proyecto con el ID de la carpeta main
                            usuario.update(
                                { _id: req.session.codigoUsuario },
                                {
                                    $push: {
                                        proyectos: {
                                            nombreProyecto: req.body.nombreProyecto,
                                            idCarpetaMain: data._id
                                        }
                                    }
                                }
                            ).then(resultado => {
                                var cantidadDispnible = parseInt(req.cookies.cantDisponibles) - 1
                                usuario.update({ _id: req.session.codigoUsuario },
                                    {
                                        $set: {
                                            "almacenamiento.cantidadProyectosDisponibles": cantidadDispnible
                                        }
                                    })
                                    .then(result => {
                                        res.cookie("cantDisponibles", cantidadDispnible);
                                        res.send(result);
                                    })
                                    .catch(error => {
                                        res.send(error);
                                    });

                            }).catch(error => {
                                res.send(error);
                            });
                        }).catch(error => {
                            res.send(error);
                        });
                    }).catch(error => {
                        res.send(error);
                    });
            } else
                res.send({ estatus: 0, mensaje: "No tiene espacio para crear más proyectos" });
        })
        .catch(error => {
            res.send(error);
        });


});




//crea los tres archivos por defecto cuando el proyecto es nuevo
router.put("/crearArchivos/:idCarpetaPadre", function (req, res) {
    usuario.update(
        { _id: req.session.codigoUsuario },
        {
            $push: {
                archivos: {
                    $each:
                        [{
                            idCarpetaContenedora: req.params.idCarpetaPadre,
                            nombreArchivo: "index",
                            contenido: "",
                            extension: "html"
                        }
                            , {
                            idCarpetaContenedora: req.params.idCarpetaPadre,
                            nombreArchivo: "estilos",
                            contenido: "",
                            extension: "css"
                        }
                            , {
                            idCarpetaContenedora: req.params.idCarpetaPadre,
                            nombreArchivo: "controlador",
                            contenido: "",
                            extension: "js"
                        }]
                }
            }
        }
    )
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        });
});








router.post("/cambiar-codigo-carpeta", function (req, res) {
    res.cookie("idCarpeta", req.body.codigoCarpeta);
    res.send({ mensaje: "Se guardo la cookie" });
});

router.post("/cambiar-codigo-snippet", function (req, res) {
    res.cookie("idSnippet", req.body.codigoSnippet);
    res.send({ mensaje: "Se guardo la cookie de snippet" });
});



//enviar informacion del proyecto al editor
router.get("/proyectoCarpeta", function (req, res) {
    usuario.find({ _id: req.session.codigoUsuario }, { carpetas: 1 })
        .then(data => {
            var datos = [];
            for (let i = 0; i < data[0].carpetas.length; i++) {
                if (data[0].carpetas[i]._id == req.cookies.idCarpeta)
                    datos.push(data[0].carpetas[i]);
            }
            res.send(datos);
        })
        .catch(error => {
            res.send(error);
        });
});

router.get("/colaborador/:correo", function (req, res) {
    //console.log(req.params.correo)
    usuario.find({ $or: [{ email: req.params.correo }, { nombreUsuario: req.params.correo }] }, { email: 1, nombreUsuario: 1 })
        .then(data => {
            if (data.length == 0) {
                res.send({ estado: 0 })
            } else
                res.send({ estado: 1, datos: data[0] });
        })
        .catch(error => {
            res.send(error);
        });
});



module.exports = router;

// db.usuarios.update({_id:ObjectId("5ca917b691dcb4294c61cd37")},$set:{proyectos:["idProyecto" : "2", "nombreProyecto" : "test", "carpetas" :["idCarpeta":4,"idCarpetaPadre":"0"]] },
// {"nombre" : "Romance", "orden" : 2, "descripcion" : "Lorem Ipsum" },
// {"nombre" : "Comedia", "orden" : 3, "descripcion" : "Lorem Ipsum" });


// db.usuarios.find({_id:ObjectId("5ca917b691dcb4294c61cd37")},{proyectos:1}).pretty()

// db.usuarios.update({"_id" : ObjectId("5ca917b691dcb4294c61cd37")},{$push: {proyectos: { nombreProyecto:"Habitación Triple Standard" } }})
// WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

// Consultar,todasCarpetas:
// db.usuarios.find({"_id" : ObjectId("5ca917b691dcb4294c61cd37")},{carpetas:1}).pretty()


// Actualizar un campo de carpeta(array de elementos)
//  db.usuarios.update({"_id" : ObjectId("5ca917b691dcb4294c61cd37"),"carpetas.idCarpeta":ObjectId("5cb9b704adad2b18e4151b5c")},{$set:{"carpetas.$.nombreCarpeta":"hola"}})
//update({"_id" : ObjectId("5cbbbfc54250090de849a33b"),"carpetas._id":ObjectId("5cbbc6831dc95705e02a3bb2")},{$set:{"carpetas.$.estadoProyectoNuevo":false}})


// Insertar una carpeta
// db.usuarios.update({"_id" : ObjectId("5ca917b691dcb4294c61cd37")},{$push:{carpetas:{"idCarpeta":"023225"}}})
