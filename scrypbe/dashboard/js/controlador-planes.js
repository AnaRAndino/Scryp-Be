var idFree
var idPremium
var idEnter

$(document).ready(function(){

    $.ajax({
        url:"/usuarios/planes",
        method:"GET",
        dataType:"json",
        success:function(res){
              for (let i = 0; i < res.length; i++) {
                  console.log(res[i].plan)
                  const element = res[i];
                  if (element.plan =="Free") {
                       idFree= element.idPlan
                      
                  } 
                  if(element.plan =="Premium"){
                     idPremium= element.idPlan
                  }
                  if(element.plan =="Enterprise"){
                     idEnter= element.idPlan
                  }
                  
              }
        },error: function(){
                console.log(error);
            }
        });
});


var tipoPlan

$("#btnPremium").click(function(){
   contratarPlan(idPremium);
});
$("#btnFree").click(function(){
    contratarPlan(idFree);
 });
 $("#btnEnterprise").click(function(){
    contratarPlan(idEnter);
 });


 function contratarPlan(idPlan){
     console.log(idPlan)
    $.ajax({
        url:`/usuarios/contratarPlan/${idPlan}`,
        method: "PUT",
        dataType: 'json',
        success: function(respuesta){       
            console.log(respuesta);
        },
        error: function(){
            console.log(error);
        }
      });   
 }