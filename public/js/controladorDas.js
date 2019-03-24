$(document).ready(function () {
  $(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if ($(this)
      .parent()
      .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });

  // $("#menu-toggle").click(function(e) {
  //   e.preventDefault();
  //   $("#wrapper").toggleClass("toggled");
  // });

  $('#option-Proyec').click(function () {
    $('.main-content-div').load('./mis-proyectos.html');
  });

  $('#option-perfil').click(function () {
    $('.main-content-div').load('./perfil.html');
  });
});





$('.div-compartir').hide()

$('#txtNomProyec').click(function () {
  console.log($('#txtNomProyec').val());
});

function prueba() {
  console.log($('#txtNomProyec').val());
  $("#listaCompartido li").each(function () {
    alert($(this).text())
  })
}

function mostrarDivCom() {
  $('.div-compartir').removeAttr('hidden')
  console.log('click');
}


function agregarColaborador() {
  var colaborador = $('#lista-colaboradores').val();
  $('#listaCompartido').append(`
    <li onclick(quitarColaborador(${colaborador})) id="${colaborador}">
        <div class="container-fluid" style="height: auto;">
            <div class="row" style="height: auto;">
                <DIV class="col-lg-4 nombreColaborador">
                ${colaborador}
                </DIV>
                <div class="col-lg-2"  style="padding-left: 23px;">
                    Editar
                </div>
                <div class="col-lg-1" style="padding-top: 8px">
                        <input class="form-control" type="radio" name="rbt-acceso" id="rbt-privad" style="width: 50%"> 
                </div>
                <div class="col-lg-2" style="padding-left: 40px;">
                        Ver
                    </div>
                    <div class="col-lg-1" style="padding-top: 8px">
                            <input class="form-control" type="radio" name="rbt-acceso" id="rbt-privad" style="width: 50%"> 
                    </div>
            </div>
        </div>
    </li>
    `)
}

function quitarColaborador(colaborador) {
  $(`#${colaborador}`).remove()
}
