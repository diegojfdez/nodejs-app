var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/ruta1/:p1?', function (req, res) {
	res.send('<html><body><h1>Ruta1 con parametro '
	 + (req.params.p1 || 'nulo')
	 +'</h1></body></html>');
});

app.get('*', function (req, res) {
	//res.type('text/html')
	res.status(404);
	res.send('<html><body><h1>Ruta Incorrecta</h1></body></html>');
	console.log("method = "+req.method);
	console.log("path   = "+req.path);
	console.log("host   = "+req.get('host'));
});

app.listen(8000);

