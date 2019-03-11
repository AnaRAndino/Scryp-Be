var express = require('express');
var app = express();

app.use(express.static("public"));
app.listen(8002, function(){
    console.log("Servidor escuchando en el puerto 8001");
});
