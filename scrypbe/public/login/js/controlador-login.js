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

    $("#google-login").click(function () {
        loguearGoogle();
    });

    $("#email").keyup(function () {
        validarCorreo();
    })

    $('.email').focusin(function () {
        console.log('dentro email');
        $(this).removeClass("campo-error");
        $('.iconoError-vacio').hide();
        $('.mensaje-error').hide()

    })
    $('.pass').focusin(function () {
        console.log('dentro pass');
        $(this).removeClass("campo-error");
        $('.iconoError-vacio').hide();
    })

});
// Validaci'on de campos
function loguear() {
    console.log("dentro de funcion");
    var campos = [
        { campo: 'email', valido: false },
        { campo: 'pass', valido: false }];
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

    if (contValidos == 0)
        iniciar();
}

function loguearGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);

        // Llamar a NodeJS
    }).catch(function (error) {
        console.log(error);
    });
    console.log('logueando con google');
}

function validarCampoVacio(campo) {
    if ($(`#${campo}`).val() == '') {
        console.log("Esta vacio el campo:" + campo);
        return false;
    } else {
        return true;
    }
}

function mostrarIconoError(campo) {
    $('#iconError').append(`<i class="fa fa-exclamation iconoError-vacio" aria-hidden="true" id="error-${campo}"></i>`);
}



function validarCorreo() {
    if ($('#email').val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        $('#email').addClass('campo-error-email');
        return false;
    } else {
        $('#email').removeClass('campo-error-email');
        return true;
    }
}

function iniciar() {
    console.log($("form").serialize());
    var email = $("#email").val();
    var password = $("#pass").val();

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user);
        // Llamado a NodeJS
        $.ajax({
            url: "/usuarios/inciar-sesion",
            method: "POST",
            data: $("form").serialize(),
            dataType: "json", //json
            success: function (respuesta) { //200 OK

                if (respuesta.estado == 1) {
                    console.log(respuesta);
                    alert(respuesta.mensaje);

                } else if (respuesta.estado == 0) {
                    console.log(respuesta);
                    // alert(respuesta.mensaje);
                    window.location.href = "/home.html";
                }

            },
            error: function (error) {
                console.error(error);
            }
        });
    }).catch(function (error) {
        console.log(error);
        if (error.code === "auth/user-not-found") {
            alert("No se encuentra el usuario");
        } else if (error.code === "auth/wrong-password") {
            alert("Contraseña incorrecta");
        }
    });

}



