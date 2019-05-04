const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(express.static('public'));
app.use(fileUpload());



app.post('/upload', function(req, res) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    let sampleFile = req.files.sampleFile;
  
    sampleFile.mv('./uploads/' + sampleFile.name, function(err) {
        if (err){
            return res.status(500).send(err);
        }
        res.send(sampleFile.name);
    });
  });

app.listen(4200, function () {
    console.log('Servidor ejecutándose en localhost:4200');
});