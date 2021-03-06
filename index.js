var path = require("path");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var wk = require('wkhtmltopdf');
var wkOptions = require(path.join(__dirname, "lib/wkhtmlOptions.js"));
var PORT = 8000;

app.enable('trust proxy');
app.disable('x-powered-by');
app.use(bodyParser());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", function (request, response) {
	response.render("pages/home");
});

app.post("/url", function (request, response) {
	var url = request.body.url;
	if (!url) return response.render("pages/error", {error: "Invalid URL supplied"});
	return handleDownload(request, response, url)
});

function handleDownload(request, response, pageRequest) {
	var options = wkOptions(request.body);
	var title = request.body.url;
	if (request.body.name.length > 0) {
		title = request.body.name;
	}
	
	response.writeHead(200, {
		"Content-Type": 'application/pdf name="' + title + '.pdf"',
		"Content-Disposition" : 'attachment; filename="' + title + '.pdf"'
	});

	wk(pageRequest, options).pipe(response)
}

app.use(function (err, request, response, next) {
	console.log(err.stack);
	response.end(500, "An error occurred");
});

app.listen(PORT);
console.log("Listening on port", PORT);