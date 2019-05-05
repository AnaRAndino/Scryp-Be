$(document).ready(function () {
    //consultar informaci'on del usuario
    $.ajax({
       url:`/usuarios/consultar-perfil`,
        method: "GET",
        dataType: 'json',
        success: function(respuesta){       
           llenarFormularioPerfil(respuesta);
        },
        error: function(){
            console.log(error);
        }
    });
});



// //validaciones


// //funciones

function llenarFormularioPerfil(data){
    $("#nombre").val(data.nombre);
    $("#nombreUsuario").val(data.nombreUsuario);
    $("#email").val(data.email);
    $("#edad").val(data.edad);
    $("#slt-Genero").val(data.genero);
    $("#pais").val(data.pais);
    console.log(data.genero);

    $("#namePerfil").html(data.nombreUsuario);
    $("#profile-info").html(
        `
        <li><span>Nombre: ${data.nombre}</span></li>
        <li><span>Email: ${data.email}</span></li>        
        <li><span>Edad: ${data.edad}</span></li>
        <li><span>País: ${data.pais}</span></li>
        `
    )

    if (data.urlFoto=="") {
        $("#img-perfil-div").append(`
            <div class="div-img" style="background-image:url('../img/woman-2.jpg')">

            </div>
        `)
      } else {
            $("#img-perfil-div").append(`
                <div class="div-img" style="background-image:url('${data.urlFoto}')">
                </div>
            `)
      }
      $("#cantProyectos").append(`
        <span>${data.proyectos.length}</span> <span>Proyectos</span>
      `)

      $("#cantSnippets").append(`
        <span>${data.snippets.length}</span> <span>Snippets</span>
      `)
      
}



$("#btnActualizar").click(function(){
    
    var campos = [
        { campo: 'nombre', valido: false },
        { campo: 'nombreUsuario', valido: false },
        { campo: 'email', valido: false },
        { campo: 'edad', valido: false },
        { campo: 'pais', valido: false },
        { campo: 'genero', valido: false }  
    ]
    
    var contValidos = campos.length
    
    for (var i = 0; i < campos.length; i++) {
        var campo = campos[i].campo;
        campos[i].valido = validarCampoVacio(campo);
    
        if (!campos[i].valido) {
            $(`#text-error-${campo}`).show();
        } else {
            contValidos -= 1;
            $(`#text-error-${campo}`).hide();
        }
    
    };
    
    if (contValidos == 0)
       actualizar();
})


    
function validarCampoVacio(campo) {
    if ($(`#${campo}`).val() == '') {
        console.log("Esta vacio el campo:" + campo);
        return false;
    } else {
        return true;
    }
}


function actualizar(){
    $.ajax({
        url:`/usuarios/actualizar-perfil`,
        method: "PUT",
        data: $('#frmperfil').serialize(),
        dataType: 'json',
        success: function(respuesta){       
            $("#namePerfil").html($("#nombreUsuario").val());
            $("#profile-info").html(
                `
                <li><span>Nombre: ${$("#nombre").val()}</span></li>
                <li><span>Email: ${$("#email").val()}</span></li>        
                <li><span>Edad: ${$("#edad").val()}</span></li>
                <li><span>País: ${$("#pais").val()}</span></li>
                `
            )

            $(".alert-success").html(`
      <strong>Success!</strong> Se guardaron los cambios
      `)
      $("#modalSuccess").modal("show");
        },
        error: function(){
            console.log(error);
        }
    });  
}


$("#btnEditarPerfil").click(function(){
    $("#frmCon").hide();
    $("#frmperfil").show();
});

$("#btnCambiarContrasenia").click(function(){
    $("#frmCon").show();
    $("#frmperfil").hide();
});


$("#btnActualizarCont").click(function(){
    var campos = [
        { campo: 'contrasenia', valido: false },
        { campo: 'confContrasenia', valido: false }
    ]
    
    var contValidos = campos.length
    
    for (var i = 0; i < campos.length; i++) {
        var campo = campos[i].campo;
        campos[i].valido = validarCampoVacio(campo);
    
        if (!campos[i].valido) {
            $(`#text-error-${campo}`).show();
        } else {
            contValidos -= 1;
            $(`#text-error-${campo}`).hide();
        }
    
    };
    
    if (contValidos == 0)
        actualizarContrasenia();
});

function actualizarContrasenia(){
    $.ajax({
        url:`/usuarios/contrasenia`,
        method: "PUT",
        data: $('#formContrasenia').serialize(),
        dataType: 'json',
        success: function(respuesta){       
            console.log(respuesta);
        },
        error: function(){
            console.log(error);
        }
    });  
}