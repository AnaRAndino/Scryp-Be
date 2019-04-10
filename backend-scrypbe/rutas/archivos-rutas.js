module.exports = function (app) {


    //obtener contenido de archivo

    app.get('/editor-run-archivo', function (req, res) {
        fetch('/test.txt')
            .then(res => res.text())
            .then(content => {
                res.send(content);
            })
            .catch(error => {
                res.send(error);
            });;
    });
}