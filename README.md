# scryp-be
Proyecto Sistemas expertos I 2019

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
nodemon index.js
```

### Create db in mogo db
```
Copy text in file inertar-info.js
```

### Consideraciones acerca del Proyecto

1. AL crear Un proyecto, se crean automaticamente los archivos necesarios. 
2. Al guardar el proyecto se guardan los archivos en una BD local en IndexedDB
3. Se implementaron las reglas de la seguridad de firebase de tal manera que sólo los usuarios autenticados puedan ingresar a a plataforma.
4. Manejo de seguridad en las sesiones de usuarios, de manera que solo puede navegar si el usario esta autenticado.
5. Sube Archivos, a la carpeta file-upload de forma no asincrona.

