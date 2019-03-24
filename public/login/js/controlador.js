$(document).ready(function(){
    
    $("#iniciar-sesion").click(function(){
       loguear();
    });

    $("#email").keyup(function(){
        validarCorreo();
    })


// Validaci'on de campos
    function loguear(){
        console.log("dentro de funcion");
        var campos = [
                {campo:'email', valido:false},
                {campo:'pass',valido:false}];
                $(".iconoError").addClass('iconoError-vacio');

        for (var i =0; i<campos.length;i++){    
            campos[i].valido = validarCampoVacio(campos[i].campo)
            if (!campos[i].valido){
                $(`#${campos[i].campo}`).addClass('campo-error');              
                mostrarIconoError(campos[i].campo);
                $(`#text-error-${campos[i].campo}`).css('display','block');
            }             
        };

        function validarCampoVacio(campo){     
            if ($(`#${campo}`).val() == ''){
                console.log("Esta vacio el camo:" + campo);
                return false  ;         
          }else{
              console.log("bien");
              return true;
          }
        }

        function mostrarIconoError(campo){
            $('#iconError').append(`<i class="fa fa-exclamation iconoError-vacio" aria-hidden="true" id="error-${campo}"></i>`);           
        }

            
        var parametros= {
            correo: $("#email").val(),
            contrasena: $("#pass").val()
        }

        $.ajax({
            url:"/iniciar-sesion",
            method:"POST",
            data: parametros,
            dataType:"json", //json
            success: function(respuesta){ //200 OK

                if (respuesta === []){
                    alert("No se encontro usuario");
                }else{
                    window.location.href = "../dashboard/dashboard.html";
                }
                console.log(respuesta);
            },
            error:function(error){
                console.error(error);
            }
        });
    };
    
    $('.email').focusin(function(){    
        console.log('dentro');
        $(this).removeClass("campo-error");
        $('.iconoError-vacio').remove();
      // $( "#error-email").remove();
        
    })
    $('.pass').focusin(function(){    
        $(this).removeClass("campo-error");
       //$( "#error-pass").remove();
    })

    // $('.email').focusout(function(){
    //     console.log('fuera');
    //     if ($(this).val() == ""){
    //         console.log("no hay data");
    //         $(this).addClass("campo-error");
    //     }
    // })

    function validarCorreo(){
        if($('#email').val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            $('#email').addClass('campo-error-email');
            return false;
        }else{
            $('#email').removeClass('campo-error-email');
            return true;
        }
        
         
    
    }




    
});