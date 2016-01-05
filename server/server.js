var path = require('path');
var request = require('request');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var compression = require('compression');

var app = express();

// Enable gzip
app.use(compression());

// Serve dist
app.use(express.static(path.resolve(__dirname, '../public')));

// Parse json for mails
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Favicon
app.use(favicon(path.join(__dirname, 'fav.ico')));

// View render
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/images', function(req, res) {
  const url ='https://api.imgur.com/3/gallery/t/' +
    req.param('tag') + '/' +
    req.param('sort') + '/' +
    req.param('pagination') + '.json';

  const options = {url: url, headers: {'Authorization': process.env.IMGUR_KEY}};

  request(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(JSON.parse(body));
    } else {
      res.send({error: error});
    }
  });
});

// Render files
app.get('/', function (req, res) {
  res.render('index');
});

// Launch app
var server = app.listen((process.env.PORT || 9000), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
