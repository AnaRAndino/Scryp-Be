module.exports = function (app) {
    var express = require("express");

    app.get("/login", function (request, response) {
        console.log("Hola funcionó");
        // response.render('./public/index');
    });
}