
$(document).ready(function(){
  consultarFavoritos(); //id carpeta Mis proyectos
})



function consultarFavoritos(){
    //consultar favoritos
    var carpetas = ""
    $.ajax({
        url:`carpetas/carpetas-favoritos`,
        method: "GET",
        dataType: 'json',
        success: function(res){       
            console.log(res);
            
            for (let i = 0; i < res.length; i++) {
              var carpeta =res[i]
              carpetas += `
                <div class="contenedor-carpeta col-lg-2 col-md-2 col-sm-6 col-xs-12">
                    <div class="img-proyecto" onclick=cambiarCodigoCarpeta('${carpeta._id}')>
                    </div>
                    <div style="text-align: center">
                        <span class="nom-carpeta">${carpeta.nombreCarpeta}</span>
                    </div>
                </div>
              `
           
            //   carpetas +=  `
            //     <div class="contenedor-carpeta col-lg-3 col-md-3 col-sm-6 col-xs-12">
            //     <div id="fondoImagen" ondblclick=cambiarCodigoCarpeta('${carpeta._id}')>
            //         <div id="fondoContenedor">
            //             <i class="fas fa-code fa-2x" style="color:#5c6ac4"></i>
            //             <div class="nombre">
            //                 <span class="nom-carpeta">${carpeta.nombreCarpeta}</span>
            //             </div>
            //             <i class="fas fa-code fa-2x" style="color:#5c6ac4;float: right; padding-top: 10px;"></i>
            //         </div>
            //     </div>
            // </div>
            //   `              
            }
            $(".fila").append(
              carpetas
             )
             
        },
        error: function(){
            console.log(error);
        }
    });

    
}

function cambiarCodigoCarpeta(codigoCarpeta){
  $.ajax({
  url:"/usuarios/cambiar-codigo-carpeta",
  method:"POST",
  data:"codigoCarpeta="+codigoCarpeta,
  dataType:"json",
  success:function(respuesta){
    //cargarCarpetas();
        console.log(respuesta);
        $(".fila").html("")
        cargarProyectos();
        cargarArchivos();
        cargarSnippets();
          
  },error: function(){
          console.log(error);
      }
  });

  
}



// Obtener archivos de carpeta seleccionada(cookie guardada)
function cargarArchivos(){
  $.ajax({
    url:`/archivos/`,
    method: "GET",
    dataType: 'json',
    success: function(res){       
        console.log(res);
        var archivos = ""
        for (let i = 0; i < res.length; i++) {
          var archivo =res[i]
          console.log(archivo.nombreArchivo);
          console.log("cant archivos:" + res.length);
          var tipoArchivo =""
          if (archivo.extension=="html")
              tipoArchivo = "../img/html.png"
          else if(archivo.extension=="css")
              tipoArchivo="../img/css.png"
          else if(archivo.extension=="js")
              tipoArchivo="../img/javascript.png"

          archivos +=  `
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
    error: function(){
        console.log(error);
    }
});
}


function cargarProyectos(){
    var carpetas = ""
    $.ajax({
        url:`/carpetas/`,
        method: "GET",
        dataType: 'json',
        success: function(res){       
            console.log(res);
            
            for (let i = 0; i < res.length; i++) {
              var carpeta =res[i]
           
              if(carpeta.estadoProyectoNuevo) //verifica si el proyecto es nuevo
                crearArchivosProyecto(carpeta._id);

              carpetas +=  `
                <div class="contenedor-carpeta col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div id="fondoImagen" ondblclick=cambiarCodigoCarpeta('${carpeta._id}')>
                    <div id="fondoContenedor">
                        <i class="fas fa-code fa-2x" style="color:#5c6ac4"></i>
                        <div class="nombre">
                            <span class="nom-carpeta">${carpeta.nombreCarpeta}</span>
                        </div>
                        <i class="fas fa-code fa-2x" style="color:#5c6ac4;float: right; padding-top: 10px;"></i>
                    </div>
                </div>
            </div>
              `              
            }
            $(".fila").append(
              carpetas
             )
        },
        error: function(){
            console.log(error);
        }
    });

    
}


function cambiarCodigo(){  
    window.location.href ="/projectEditor.html";
   
}