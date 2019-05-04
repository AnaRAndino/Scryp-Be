

$("#subir").click(function(){
    $.ajax({
        url: "/upload",
        method: "POST",
        data: $("#uploadForm").serialize(),
        dataType: "json",
        success: function (respuesta) {
    
        }, error: function () {
            console.log(error);
        }
    })
})