// --------------------------Indexed DB--------------------------------//
var db;
function indexedDB() {



}

function guardarIndexedDb() {
    alert("dentro de indexeddb");
    // var transaction = db.transaction(["archivos"], "readwrite");
    // var ObjestoreArchivos = transaction.objectStore("archivos");

    // var cursor = ObjestoreArchivos.openCursor();
    // cursor.onerror = function (event) {
    //     console.log("case if have an error");
    // };

    // cursor.onsuccess = function (event) {
    //     var cursor = event.target.result;
    //     if (cursor) {
    //         var respuesta = cursor.value;
    //         console.log(respuesta);
    //         if (respuesta.archivoHtml.idArchivo == archivoHtml._id) {//we find by id an user we want to update
    //             var archivo = {
    //                 archivoHtml: {
    //                     idArchivo: archivoHtml._id,
    //                     contenido: editorHTML.getValue()
    //                 },
    //                 archivoCSS: {
    //                     idArchivo: archivoHtml._id,
    //                     contenido: editorHTML.getValue()
    //                 },
    //                 achivoJS: {
    //                     idArchivo: archivoHtml._id,
    //                     contenido: editorHTML.getValue()
    //                 },
    //                 idCarpetaPRoyecto: archivoHtml.idCarpetaContenedora
    //             }

    //             var res = cursor.update(archivo);
    //             res.onsuccess = function (e) {
    //                 console.log("update success!!");
    //             }
    //             res.onerror = function (e) {
    //                 console.log("update failed!!");
    //             }
    //             console.log("Encontrado");
    //         } else {
    //             // guardarArchivo();
    //             console.log("No Encontrado");
    //         }
    //         cursor.continue();
    //     }
    //     else {
    //         console.log("fin mise a jour");
    //     }
    // }


    // function guardarArchivo(){

    // }



    var transaccion = db.transaction(['archivos'], 'readwrite');
    var objectStoreCategorias = transaccion.objectStore('archivos');

    var solicitud = objectStoreCategorias.add(
        {
        archivoHtml: {
            idArchivo: archivoHtml._id,
            contenido: editorHTML.getValue()
        },
        archivoCSS: {
            idArchivo: archivoHtml._id,
            contenido: editorHTML.getValue()
        },
        achivoJS: {
            idArchivo: archivoHtml._id,
            contenido: editorHTML.getValue()
        },
        idCarpetaPRoyecto: archivoHtml.idCarpetaContenedora
    });


    solicitud.onsuccess = function (evento) {
        console.log("Se agrego con 'exito al objectsrore de Proyectos");
        console.log(evento);
    }
    solicitud.onerror = function (event) {
        console.log("Error: " + event);
    };
}




//---------------------------------------------------------------------//
var archivoHtml;
var archivoCss;
var archivoJS;

var editorHTML = ace.edit("editor");
var editorCSS = ace.edit("editor1");
var editorJS = ace.edit("editor2");



$(document).ready(function () {
    // console.log(editorHTML.find('head').end.row);

    // indexedDB();

    consultarArchivos();
    cargarProyectoCarpeta();
});





function consultarArchivos() {
    $.ajax({
        url: `/archivos/`,
        method: "GET",
        dataType: 'json',
        success: function (res) {
            console.log(res);

            if (res.length == 0)
                consultarArchivosCompartidos();
            else {
                for (let i = 0; i < res.length; i++) {
                    var archivo = res[i]
                    console.log(archivo.nombreArchivo);
                    console.log("cant archivos:" + res.length);

                    if (archivo.extension == "html")
                        archivoHtml = archivo
                    else if (archivo.extension == "css")
                        archivoCss = archivo
                    else if (archivo.extension == "js")
                        archivoJS = archivo
                }

                cargarArchivos(archivoHtml, archivoCss, archivoJS);
            }
        },
        error: function () {
            console.log(error);
        }

    });
}


function consultarArchivosCompartidos() {
    $.ajax({
        url: `/archivos/cargar-archivos-project`,
        method: "GET",
        dataType: 'json',
        success: function (res) {
            console.log(res);

            for (let i = 0; i < res.length; i++) {
                var archivo = res[i]
                console.log(archivo.nombreArchivo);
                console.log("cant archivos:" + res.length);

                if (archivo.extension == "html")
                    archivoHtml = archivo
                else if (archivo.extension == "css")
                    archivoCss = archivo
                else if (archivo.extension == "js")
                    archivoJS = archivo
            }

            cargarArchivos(archivoHtml, archivoCss, archivoJS);
        },
        error: function () {
            console.log(error);
        }

    });
}



function cargarArchivos(archivoHtml, archivoCss, archivoJS) {

    editorHTML.setTheme("ace/theme/monokai");
    editorHTML.session.setMode("ace/mode/html");
    editorHTML.setValue(archivoHtml.contenido);

    editorCSS.setTheme("ace/theme/monokai");
    editorCSS.session.setMode("ace/mode/css");
    editorCSS.setValue(archivoCss.contenido);

    editorJS.setTheme("ace/theme/monokai");
    editorJS.session.setMode("ace/mode/javascript");
    editorJS.setValue(archivoJS.contenido);

    //keyup del html
    editorHTML.session.on('change', function (delta) {
        ejecutar();
    });

    //keyup del css
    editorCSS.session.on('change', function (delta) {
        ejecutar();
    });

    //keyup del css 
    var contadorJs = 0;
    editorJS.session.on('change', function (delta) {
        contadorJs += 1
        if (contadorJs === 1) {
            setTimeout(ejecutar, 4000);
            setTimeout(function () { contadorJs = 0 }, 2000);
        }
    });

    function ejecutar() {
        var scriptJquery = '<script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>'

        var code = document.getElementById("code").contentWindow.document;
        code.open();
        code.writeln('<style>' + editorCSS.getValue() + '</style>' + editorHTML.getValue() + scriptJquery + '<script>' + editorJS.getValue() + '</script>');
        code.close();
    };
}

function actualizarArchivo(tipoArchivo) {
    var idArchivoActualizar = ""
    var contenidoActualizar = ""
    if (tipoArchivo == "html") {
        idArchivoActualizar = archivoHtml._id;
        contenidoActualizar = editorHTML.getValue();
    }
    if (tipoArchivo == "css") {
        idArchivoActualizar = archivoCss._id;
        contenidoActualizar = editorCSS.getValue();
    }
    if (tipoArchivo == "js") {
        idArchivoActualizar = archivoJS._id;
        contenidoActualizar = editorJS.getValue();
    }

    var datos = `idArchivo=${idArchivoActualizar}&contenido=${contenidoActualizar}`;

    $.ajax({
        url: `/archivos/modificarContenidoArchivo`,
        method: "PUT",
        data: datos,
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            return true;
        },
        error: function () {
            console.log(error);
        }
    });


}

function volverPRincipal() {
    window.location.href = "/home.html"
}

function cargarProyectoCarpeta() {
    $.ajax({
        url: `/carpetas/proyectoCarpeta`,
        method: "GET",
        dataType: 'json',
        success: function (res) {
            console.log(res);
            $(".nombreProyecto").append(`
                
                    <h5><span>${res.nombreCarpeta} </span></h5>             
    `)
        },
        error: function () {
            console.log(error);
        }

    });
}

$("#btnGuardarProyecto").click(function () {
    var resultadohtml = actualizarArchivo("html");
    var resultadoCSS = actualizarArchivo("css");
    var resultadoJS = actualizarArchivo("js");
    guardarIndexedDb();
});

$("#btnFavorite").click(function () {
    $.ajax({
        url: `/carpetas/modificarEstadoDestacado`,
        method: "PUT",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            alert("Proyecto añadido a favoritos");
        },
        error: function (error) {
            console.log(error);
        }
    });
})

$("#btnShare").click(function () {

    $('#myModalShare').modal('show');

})

function compartir() {
    console.log("here compa");
    $.ajax({
        url: "/carpetas/compartir",
        method: "PUT",
        data: "colaborador=" + $("#txt-colaborador").val(),
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta.estado == 1) {
                console.log("bien");
            } else if (respuesta.estado == 0)
                alert(respuesta.mensaje);


        },
        error: function () {
            console.log(error);
        }
    });
}





// Start file download.

$("#descargarHtml").click(function () {
    download(archivoHtml.nombreArchivo + ".html", editorHTML.getValue());
})

$("#descargarCss").click(function () {
    download(archivoCss.nombreArchivo + ".css", editorCSS.getValue());
})

$("#descargarJs").click(function () {
    download(archivoJS.nombreArchivo + ".js", editorJS.getValue());
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

