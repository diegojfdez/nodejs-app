var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/preguntas', function (req, res) {
	res.send(
		'<html><body>'
//	+	'  <form method="post" action="/respuesta?id=1&_method=put">'
	+	'  <form method="get" action="/respuesta">'
	+	    '¿Quién descubrió América?<br />'
	+	    '<input type="hidden" name="id" value="1"/>'
	+	    '<input type="text" name="descubridor" /><br />'
	+	'  </form>'
//	+	'  <form method="post" action="/respuesta?id=2&_method=put">'
	+	'  <form method="get" action="/respuesta">'
	+	    '¿Capital de Portugal?<br />'
	+		'<input type="hidden" name="id" value="2"/>'
	+	    '<input type="text" name="capital" /><br />'
	+	'  </form>'
	+	'</body></html>'

	);
});

//app.put('/respuesta', function (req, res) {
app.get('/respuesta', function (req, res) {
//	console.log(req.params+"\n"+""+req.param["id"]+"\n");
		var respuesta = 
			'<html><body>'
			+	'<h1>Incorrecto.</h1>'
			+	'<h3>';

		var cola = '<a href="/preguntas">Volver a la página inicial</a>'
		+	'</body></html>';
		
	switch(req.query.id)
	{
	case "1":
			respuesta+=	req.query.descubridor
			+ 	' NO descubrió América.</h3>'
			+ cola;
		if(/^(Cristobal\s*)?Col[oó]n$/.test(req.query.descubridor))
			res.send(respuesta.replace(/ NO/,'').replace(/Incorrecto/,'Correcto'));
		else
			res.send(respuesta);
		break;
	case "2":
		respuesta+= req.query.capital
			+ 	' NO es la capital de Portugal.</h3>'
			+ cola;
			
		if(/^\s*Lisboa\s*$/.test(req.query.capital))
			res.send(respuesta.replace(/ NO/,'').replace(/Incorrecto/,'Correcto'));
		else
			res.send(respuesta);
		break;
	default:	next();
	}


});

app.get('*', function (req, res) {
	//res.type('text/html')
	res.status(404);
	res.send('<html><body><h1>404!!</h1></body></html>');
	console.log("method = "+req.method);
	console.log("path   = "+req.path);
	console.log("host   = "+req.get('host'));
});

app.listen(8000);

