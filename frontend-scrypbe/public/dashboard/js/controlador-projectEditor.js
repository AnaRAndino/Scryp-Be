$(document).ready(function () {
    var styles = `
        <style>
            h1{
                color: red;
            }
        </style>
    `
    var textoHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            ${styles}
        </head>
        <body>
            <h1>Hello World</h1>
        </body>
        </html>
        `

    const editorHTML = ace.edit("editor");
    editorHTML.setTheme("ace/theme/monokai");
    editorHTML.session.setMode("ace/mode/html");
    editorHTML.setValue(textoHtml);


    var editorCSS = ace.edit("editor1");
    editorCSS.setTheme("ace/theme/monokai");
    editorCSS.session.setMode("ace/mode/css");

    var editorJS = ace.edit("editor2");
    editorJS.setTheme("ace/theme/monokai");
    editorJS.session.setMode("ace/mode/javacript");

    //keyup del html
    editorHTML.session.on('change', function(delta) {    
        $("#testj").html('<style>'+editorCSS.getValue()+'</style>'+editorHTML.getValue()+'<script>'+editorJS.getValue()+'</script>');
    });
    
    //keyup del css
    editorCSS.session.on('change', function(delta) {
       
         $("#testj").html('<style>'+editorCSS.getValue()+'</style>'+editorHTML.getValue()+'<script>'+editorJS.getValue()+'</script>');
    });

    //keyup del css
    editorJS.session.on('change', function(delta) {
        console.log('<style>'+editorCSS.getValue()+'</style>'+editorHTML.getValue()+'<script>'+editorJS.getValue()+'</script>')
       
        $("#testj").html('<style>'+editorCSS.getValue()+'</style>'+editorHTML.getValue()+'<script>'+editorJS.getValue()+'</script>');
   });
})

function correr(){
    var TXT_URL = archivoPrueba;

    $.ajax
    (
    	{
        	url : TXT_URL,
			dataType: "text",
			success : function (data) 
			{
            	$(".text").html("<pre>"+data+"</pre>");
			}
		}
	);
   
}