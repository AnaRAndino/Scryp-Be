module.exports = function (app) {
    var mongoose = require("mongoose");
    var dbconfig = require("../modulos/db-config");
    var express = require("express");
    var usuario = require("../modelos/usuarios");


    app.post('/registrar-usuario', function (req, res) {

        //consulta para verificar que no existe el usuario
        usuario.find({ email: req.body.email })
            .then(data => {
                if (data.length == 0) {

                    var objUsuario = new usuario({
                        nombre: req.bodynombre,
                        nombreUsuario: req.body.nombreUsuario,
                        email: req.body.email,
                        contrasenia: req.body.contrasenia,
                        edad: 0,
                        genero: "x",
                        almacenamiento: {
                            plan: { idPlan: "1", tipoPlan: "Free", suscripcion: "indefinida", alamacenamiento: "500MB" }
                        },
                        facturas: 0,
                        proyectos: {
                            proyecto: { idCarpetaMain: "" }
                        },
                        snippes: {

                        },
                        colaboradores: {
                            colaborador: {}
                        },
                        proyectosCompartidos: {
                            proyecto: {}
                        },
                    });


                    objUsuario.save()
                        .then(obj => {
                            res.send({ estatus: 0, mensaje: "Registro Exitoso" })
                        })
                        .catch(error => {
                            res.send("error");
                        });


                }else
                    res.send({ estatus: 1, mensaje: "Ya hay una cuenta con este correo." });
            })
            .catch(error => {
                res.send(error);
            });



    });

    app.delete('/eliminar-usuario', function (req, res) {
        res.send({Mensaje: "Eliminar usuario"});
    });


    app.post('/inciar-sesion', function(req,res){
        usuario.find({ email: req.body.email, contrasenia: req.body.contrasenia })
        .then(data => {
           if (data.length == 0){
            res.send({estado:1, mensaje: "Usuario no encontrado"});
           }else            
            res.send({estado:0, mensaje:data});
        })
        .catch(error => {
            res.send(error);
        });
    });
}