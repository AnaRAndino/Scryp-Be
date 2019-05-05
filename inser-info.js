// DB
use db_scryp_be;
// colecciones
db.createCollection('usuarios');
db.createCollection('planes');
db.createCollection('carpetas');
db.createCollection('archivos');



// Insertar Coleccion de planes
db.planes.insertMany([
{
    plan:"Free",
    cantidadProyectos:5,
    cantidadSnippets:5,
    precio:0,
    idPlan:1
},
{
    plan:"Premium",
    cantidadProyectos:25,
    cantidadSnippets:10,
    precio:22,
    idPlan:2
},
{
    plan:"Enterprise",
    cantidadProyectos:50,
    cantidadSnippets:20,
    precio:75,
    idPlan:2
}
])

db.usuarios.insert(
    {
        firabaseId:"wZfOWzl6CLgTDaWDVMMTmhgaZKX2",
        nombreUsuario: "anar85",
        nombre: "Ana Raquel Andino",
        email: "aniandino58@gmail.com",
        edad: 23,
        genero: "F",
        pais: "Honduras",
        urlFoto: "https://lh3.googleusercontent.com/-eO_UP8RGk8o/AAAAAAAAAAI/AAAAAAAAAUU/c2YwOmfMN7c/photo.jpg",
        almacenamiento :  {
                idPlan:1,
                cantidadProyectosDisponibles:5
        },        
        facturas: 0,
        proyectos: [],
	    carpetas: [],
        archivos:[],
        snippets:[],
    }
)
