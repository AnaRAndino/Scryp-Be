$(document).ready(function () {

    $("#iniciar-sesion").click(function () {
        loguear();
    });

    // $("#email").keyup(function () {
    //     validarCorreo();
    // })

    // Validaci'on de campos
   

    $("input[type='text']").focusin(function () {
        console.log('dentro');
        $(this).removeClass("campo-error");
        $('.iconoError-vacio').hide();
        $('.mensaje-error').hide()
    })

    $("input[type='password']").focusin(function () {
        console.log('dentro');
        $(this).removeClass("campo-error");
        $('.iconoError-vacio').hide();
    })

 
});


function loguear() {
    console.log("dentro de funcion");
    var campos = [
        { campo: 'nombre', valido: false },
        { campo: 'nombre-usuario', valido: false },
        { campo: 'email', valido: false },
        { campo: 'pass', valido: false },
        { campo: 'conf-pass', valido: false }];
        validarContrasenias();
        $('#iconError').html("");
    for (var i = 0; i < campos.length; i++) {
        campos[i].valido = validarCampoVacio(campos[i].campo)
        var campo = campos[i].campo
        if (!campos[i].valido) {
            $(`#${campo}`).addClass('campo-error');
            mostrarIconoError(campo);
            $(`#text-error-${campo}`).show();
        } else {
            mostrarIconoError(campo);
            $(`#text-error-${campo}`).hide();
            $(`#error-${campo}`).css('visibility','hidden');
            $(`#error-${campo}`).css('margin-bottom','0px');
        }
    };

    function validarCampoVacio(campo) {
        if ($(`#${campo}`).val() == '') {
            console.log("Esta vacio el campo:" + campo);
            return false;
        } else {
            console.log("bien");
            return true;
        }
    };
    
};

function mostrarIconoError(campo) {
    $('#iconError').append(`<i class="fa fa-exclamation iconoError-vacio" aria-hidden="true" id="error-${campo}"></i>`);
};

function validarCorreo() {
    if ($('#email').val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        $('#email').addClass('campo-error-email');
        return false;
    } else {
        $('#email').removeClass('campo-error-email');
        return true;
    }
}

function validarContrasenias() {
    if ($(`#pass`).val() != "") {
        if ($(`#pass`).val() !=  $(`#conf-pass`).val()){
            $(`#text-error-conf-pass-nocoin`).show();
            $(`#text-error-conf-pass-nocoin`).css('color','rgb(226, 138, 6)');
        }else{
            $(`#text-error-conf-pass-nocoin`).hide();
        }
    }
};