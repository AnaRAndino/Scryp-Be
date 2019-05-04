

$(document).ready(function () {
  cargarSnippet();

});

function  cargarSnippet(){
  $.ajax({
    url: `/usuarios/snippets`,
    method: "GET",
    dataType: 'json',
    success: function (res) {
      console.log(res.snippets);
      $(".fila").html("");
      var archivos = ""
      for (let i = 0; i < res.snippets.length; i++) {
        var snipt = res.snippets[i]
        archivos += `
              <div class="contenedor-archivo col-lg-2 col-md-3 col-sm-6 col-xs-12">
                  <div class="img-archivo" style="background-image:url('../img/snipt.png')" ondblclick="cargarCodigo('${snipt._id}')"></div>
                  <div style="text-align:center">
                      <span class="nom-carpeta">${snipt.nombre}.${snipt.lenguaje}</span>
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

