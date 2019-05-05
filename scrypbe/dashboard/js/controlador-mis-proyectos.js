var codigoCarpetaAbrir
$(document).ready(function () {
  cambiarCodigoCarpeta("0"); //id carpeta Mis proyectos
})

function cambiarCodigoCarpeta(codigoCarpeta) {
  $.ajax({
    url: "/usuarios/cambiar-codigo-carpeta",
    method: "POST",
    data: "codigoCarpeta=" + codigoCarpeta,
    dataType: "json",
    success: function (respuesta) {
      //cargarCarpetas();
      console.log(respuesta);
      $(".fila").html("")
      cargarCarpetas();
      cargarArchivos();
      cargarSnippets();

    }, error: function () {
      console.log(error);
    }
  });
}


function cargarCarpetas() {
  var carpetas = ""
  $.ajax({
    url: `/carpetas/`,
    method: "GET",
    dataType: 'json',
    success: function (res) {
      for (let i = 0; i < res.length; i++) {
        var carpeta = res[i]

        if (carpeta.estadoProyectoNuevo) //verifica si el proyecto es nuevo
          crearArchivosProyecto(carpeta._id);

        if (carpeta.estadoProyectoNuevo == undefined) { //carpeta normal
          carpetas += `
                <div class="contenedor-carpeta col-lg-2 col-md-2 col-sm-6 col-xs-12">
                    <div class="img-carpeta" onclick=cambiarCodigoCarpeta('${carpeta._id}')>

                    </div>
                  <div style="text-align: center">
                      <span class="nom-carpeta">${carpeta.nombreCarpeta}</span>
                  </div>
                </div>
                  `
        } else {
          carpetas += `
                <div class="contenedor-carpeta col-lg-2 col-md-2 col-sm-6 col-xs-12">
                    <div class="img-proyecto" onclick=cambiarCodigoCarpeta('${carpeta._id}')>
                    </div>
                    <div style="text-align: center">
                        <span class="nom-carpeta">${carpeta.nombreCarpeta}</span>
                    </div>
                </div>
              `
        }


      }
      $(".fila").append(
        carpetas
      )
    },
    error: function () {
      console.log(error);
    }
  });


}




function crearArchivosProyecto(codigoCarpetaPadre) {
  $.ajax({
    url: `/archivos/crearArchivos/${codigoCarpetaPadre}`,
    method: "POST",
    dataType: 'json',
    success: function (respuesta) {
      console.log(respuesta);
      modificarEstadoProyectoNuevo(codigoCarpetaPadre); //modifica el estado(bandera) proyecto nuevo
    },
    error: function () {
      console.log(error);
    }
  });
}


function modificarEstadoProyectoNuevo(codigoCarpeta) {
  $.ajax({
    url: `/carpetas/modificarEstadoProyectoNuevo/${codigoCarpeta}`,
    method: "PUT",
    dataType: 'json',
    success: function (respuesta) {
      console.log(respuesta);
    },
    error: function () {
      console.log(error);
    }
  });
}

// Obtener archivos de carpeta seleccionada(cookie guardada)
function cargarArchivos() {
  $.ajax({
    url: `/archivos/`,
    method: "GET",
    dataType: 'json',
    success: function (res) {
      console.log(res);
      var archivos = ""
      for (let i = 0; i < res.length; i++) {
        var archivo = res[i]
        console.log(archivo.nombreArchivo);
        console.log("cant archivos:" + res.length);
        var tipoArchivo = ""
        if (archivo.extension == "html")
          tipoArchivo = "../img/html.png"
        else if (archivo.extension == "css")
          tipoArchivo = "../img/css.png"
        else if (archivo.extension == "js")
          tipoArchivo = "../img/javascript.png"

        archivos += `
        <div class="contenedor-archivo col-lg-2 col-md-3 col-sm-6 col-xs-12">
            <div class="img-archivo" style="background-image: url('${tipoArchivo}')" ondblclick=cambiarCodigo('${archivo._id}')>      
          </div>
            <div style="text-align: center">
                <span class="nom-carpeta">${archivo.nombreArchivo}.${archivo.extension}</span>
            </div>
        </div>
          `
      }
      $(".fila").append(
        archivos
      )
    },
    error: function () {
      console.log(error);
    }
  });
}






function cambiarCodigo() {
  window.location.href = "/projectEditor.html";

}





function  cargarSnippets(){
  $.ajax({
    url: `/usuarios/cargarSnippet`,
    method: "GET",
    dataType: 'json',
    success: function (res) {
      console.log(res);
      var archivos = ""
      for (let i = 0; i < res.length; i++) {
        var snipt = res[i]
        archivos += `
              <div class="contenedor-archivo col-lg-2 col-md-3 col-sm-6 col-xs-12">
                  <div class="img-archivo" style="background-image:url('../img/snipt4.png'); background-size: contain;" ondblclick="cargarCodigo('${snipt._id}')"></div>
                  <div style="text-align:center">
                      <span class="nom-carpeta">${snipt.nombre}.${snipt.extension}</span>
                  </div>
              </div>
                `;
      }
      $(".fila").append(
        archivos
      )
    },
    error: function () {
      console.log(error);
    }
  });
}




var editorSniptt

function cargarCodigo(codigoSnipt) {
  $("#modalSnippt").modal("show");
  editorSniptt = ace.edit("editor");
  codigoSniptSeleccionado = codigoSnipt
  $.ajax({
    url: `/usuarios/snippets`,
    method: "GET",
    dataType: 'json',
    success: function (res) {
      console.log("Snipt seleccionado:")
      console.log(res);
      $(".modal-title-new-view-source").html("");
      for (let i = 0; i < res.snippets.length; i++) {
        var snippet = res.snippets[i]
        if (snippet._id == codigoSnipt) {
          $(".modal-title-new-view-source").append(snippet.nombre)
          editorSniptt.setTheme("ace/theme/monokai");
          editorSniptt.session.setMode("ace/mode/" + snippet.lenguaje.toLowerCase());
          editorSniptt.setValue(snippet.contenido);
        }
      }
    },
    error: function () {
      console.log(error);
    }
  });
}