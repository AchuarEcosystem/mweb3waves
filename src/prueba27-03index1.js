const fs = require('fs');

fs.writeFile('./data.json', 'linea uno', function(err) {
    if(err) {
        console.log(err);
    }
    console.log('Archivo creado');
});

console.log('ultima linea de codigo')