var colaboradores = [];

$(document).ready(function () {
  // Llena el combobox
  var lenguajes = [{
    nombre: "HTML",
    extension: "html"
  },{
    nombre: "JavaScript",
    extension: "js"
  },{
    nombre: "CSS",
    extension: "css"
  }];
  // {
  //   "HTML": "html",
  //   "JavaScript": "js",
  //   "CSS": "css",
  //   "Python": "py",
  //   "C#": "cs",
  //   "C": "c",
  //   "C++": "cpp",
  //   "Java": "java",
  //   "PHP": "php",
  //   "Visual Basic": "vb",
  //   "TypeScript": "ts"
  // };

  for (let i = 0; i < lenguajes.length; i++) {
    $("#lenguajes").append(`
      <option id="lenguaje-${lenguajes[i].extension}" value="${lenguajes[i].extension}">${lenguajes[i].nombre}</option>
    `);
  }

  $('.main-content-div').load('./mis-proyectos.html');
  cargarInfoPerfil();
});

  //carga otros HTML
  $('#option-Proyec').click(function () {
    $('.main-content-div').load('./mis-proyectos.html');
  });

  $('#option-perfil').click(function () {
    $('.main-content-div').load('perfil.html');
  });

  $('#option-Destacados').click(function () {
    $('.main-content-div').load('./mis-favoritos.html');
  });

  
  $('#option-colaboracion').click(function () {
    $('.main-content-div').load('./mis-compartidos.html');
  });

  $('#option-snippet').click(function () {
    $('.main-content-div').load('./snippets.html');
  });

  $('#option-plan').click(function () {
    $('.main-content-div').load('./planes.html');
  });

/**----------------Modal----------------- */

$('.div-compartir').hide()

$("#nuevoProyecto").click(function(){
  $('#modalNuevoProyecto').modal('show');
})

$("#nuevoCarpeta").click(function(){
  $('#modalNuevoCarpeta').modal('show');
});


$("#subirArchivo").click(function(){
  $("#modalNuevoArchivo").modal("show")
})

var editorSniptNew

$('#menuNuevoSnipet').click(function () {
  $("#modalSnipptNew").modal("show");
  editorSniptNew = ace.edit("editorNew");
  editorSniptNew.setTheme("ace/theme/chrome");
  editorSniptNew.setValue("");
})


function cargarInfoPerfil(){
  $.ajax({
    url:`/usuarios/consultar-perfil`,
     method: "GET",
     dataType: 'json',
     success: function(respuesta){       
        $("#nombreP").append(`<span><b> ${respuesta.nombre}</b></span>`);
        console.log(respuesta);
     },
     error: function(){
         console.log(error);
     }
 });
}




// -----------------Crear Carpeta---------------------
function crearCarpeta(){
  $.ajax({
    url:"/carpetas/crearCarpeta",
    method:"PUT",
    data:"nombreCarpeta=" + $("#txtNombreNuevoCarpeta").val(),
    dataType:"json",
    success:function(respuesta){
          console.log(respuesta);
          $(".fila").html("")
          cargarCarpetas();
          cargarArchivos();
          $("#txtNombreNuevoCarpeta").val("");
    },error: function(){
            console.log(error);
        }
    });
}


// crear proyecto y carpeta main
function crearProyecto() {
      $.ajax({
        url:`/usuarios/crearProyecto`,
        method: "PUT",
        data: $('#frmCrearProyecto').serialize(),
        dataType: 'json',
        success: function(respuesta){       
            console.log(respuesta);
            $('#modalNuevoProyecto').modal('hide');
            
            $(".fila").html(
              ""
            )
            cargarCarpetas();
        },
        error: function(){
            console.log(error);
        }
      });   
}





function crearSnippet(){
  editorSniptNew = ace.edit("editorNew");
  var datos = `titulo=${$("#nombreSnippet").val()}&lenguaje=${$("#lenguaje-" + $("#lenguajes").val()).text()}&extension=${$("#lenguajes").val()}&contenido=${editorSniptNew.getValue()}`;
  $.ajax({
    url: `/usuarios/crearSnippet`,
    method: "PUT",
    data: datos,
    dataType: 'json',
    success: function (respuesta) {
      console.log(respuesta);
      $("#modalSnipptNew").modal("hide");
      $(".fila").html("")
      cargarCarpetas();
      cargarArchivos();
      cargarSnippets();
    },
    error: function () {
      console.log(error);
    }
  });

};



$("#btn-guardar-snippet").click(function () {
  editorSnipt = ace.edit("editor");
  contenidoActualizar = editorSnipt.getValue();
  var datos = `idSnippet=${codigoSniptSeleccionado}&contenido=${contenidoActualizar}`;
  $.ajax({
    url: `/usuarios/modificarContenidoSnippet`,
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
});


$("#menu-toggle").click(function(){
  $.ajax({
		url:"/logout",
		method:"GET",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
      window.location.href = "../"
		},error: function(){
            console.log(error);
        }
    });
})



/**----------------------------------------------COmpartir---------------------------------- */
function mostrarDivCom() {
  $('#div-compartir').css('display','block');
  console.log('click');
}


function agregarColaborador() {
  var colaboradorConsultado = $('#txt-colaboradores').val();

  $.ajax({
    url:`usuarios/colaborador/${colaboradorConsultado}`,
    method: "GET",
    dataType: 'json',
    success: function(res){       
        //console.log(res);

        if(res.estado==0){
            alert("Usuario o correo inválido");
        }else if(res.estado==1){
          var colaborador = {idColaborador: res.datos._id}
          colaboradores.push(colaborador)
          agregaraDivColaboradores(colaboradorConsultado);
          console.log(colaboradores);
        }
       
    },
    error: function(){
        console.log(error)        
    }
  });
}

function agregaraDivColaboradores(colaborador){
  $('#listaCompartido').append(`
    <li onclick(quitarColaborador(${colaborador})) id="${colaborador}">
        <div class="container-fluid" style="height: auto;">
            <div class="row" style="height: auto;">
                <div class="col-lg-4 nombreColaborador">
                ${colaborador}
                </div> 
            </div>
        </div>
    </li>
    `)
}

function quitarColaborador(colaborador) {
  $(`#${colaborador}`).remove()
}






