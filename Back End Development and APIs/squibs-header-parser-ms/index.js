// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// handle /api/whoami
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
app.enable('trust proxy'); // https://expressjs.com/en/5x/api.html#app.enable
app.get('/api/whoami', (req, res) => {
  // const ipaddress = req.headers['x-forwarded-for'];
  // const language = req.headers['accept-language'];
  // const software = req.headers['user-agent'];

  // https://expressjs.com/en/5x/api.html#req.get
  // const ipaddress = req.get('x-forwarded-for');
  const language = req.get('accept-language');
  const software = req.get('user-agent');

  const ipaddress = req.ip; // https://expressjs.com/en/5x/api.html#req.ip
  res.json({ ipaddress, language, software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
