$(document).ready(function () {
    // Inicializa firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCM2jp8p2USl3cUe5gIRZunZihVA8wdoLA",
        authDomain: "fir-test-10f42.firebaseapp.com",
        databaseURL: "https://fir-test-10f42.firebaseio.com",
        projectId: "fir-test-10f42",
        storageBucket: "fir-test-10f42.appspot.com",
        messagingSenderId: "763858987167",
        appId: "1:763858987167:web:8fc50fdd975717e7"
    };
    firebase.initializeApp(firebaseConfig);

    $("#iniciar-sesion").click(function () {
        loguear();
    });

    // $("#email").keyup(function () {
    //     validarCorreo();
    // })

    // Validaci'on de campos


    $("input[type='text']").focusin(function () {
        $(this).removeClass("campo-error");
        $('.iconoError-vacio').hide();
        $('.mensaje-error').hide()
    })

    $("input[type='password']").focusin(function () {
        $(this).removeClass("campo-error");
        $('.iconoError-vacio').hide();
    })


});


function loguear() {
    var campos = [
        { campo: 'nombre', valido: false },
        { campo: 'nombre-usuario', valido: false },
        { campo: 'email', valido: false },
        { campo: 'pass', valido: false },
        { campo: 'conf-pass', valido: false }];
    //Validan las contrasenias
    validarContrasenias();

    $('#iconError').html("");
    var contValidos = campos.length

    for (var i = 0; i < campos.length; i++) {
        var campo = campos[i].campo;
        campos[i].valido = validarCampoVacio(campo);

        if (!campos[i].valido) {
            $(`#${campo}`).addClass('campo-error');
            mostrarIconoError(campo);
            $(`#text-error-${campo}`).show();
        } else {
            contValidos -= 1;

            mostrarIconoError(campo);
            $(`#text-error-${campo}`).hide();
            $(`#error-${campo}`).css('visibility', 'hidden');
            $(`#error-${campo}`).css('margin-bottom', '0px');
        }

    };

    if (contValidos == 0 & validarContrasenias())
        registrar();

};


function validarCampoVacio(campo) {
    if ($(`#${campo}`).val() == '') {
        console.log("Esta vacio el campo:" + campo);
        return false;
    } else {
        return true;
    }
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
        if ($(`#pass`).val() != $(`#conf-pass`).val()) {
            $(`#text-error-conf-pass-nocoin`).show();
            $(`#text-error-conf-pass-nocoin`).css('color', 'rgb(226, 138, 6)');
            return false;
        } else {
            $(`#text-error-conf-pass-nocoin`).hide();
            return true;
        }
    }
};

function registrar(){

    var parametros = {
        nombre: $("#nombre").val(),
        nombreUsuario: $("#nombre-usuario").val(),
        email: $("#email").val(),      
        contrasenia: $("#pass").val()       
    }

    firebase.auth().createUserWithEmailAndPassword(parametros.email, parametros.contrasenia).then(function(result){
        console.log(result);

        // Agrear NodeJS
        
        alert('Usuario creado exitosamente');
    }).catch(function(error) {
        console.log(error);
        if(error.code === 'auth/email-already-in-use'){
            alert('Este usuario ya existe');
        }else{
            alert('Ocurrió un error');
        }
    });

    // alert($("form").serialize());
    // $.ajax({
    //     url: `/usuarios/registrar-usuario`,
    //     method: "POST",
    //     data: parametros, //Cadena en formato URLEncoded
    //     dataType: 'json',
    //     success: function (res) {
    //         if(res.estatus == 0){
    //             console.log(res);
    //             limpiarItems()
    //             window.location.href = "../login"
    //         }else if(res.estatus == 1)
    //             alert(res.mensaje);
                
    //     },
    //     error: function(error){
    //         console.log(error);
    //     }
    // });    
}

function limpiarItems(){

}

