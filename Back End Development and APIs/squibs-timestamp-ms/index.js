// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// example inputs
// 2016-12-25
// 2016-12-25
// 1451001600000
// 05 October 2011, GMT
// this-is-not-a-date

// handle no param after /api
app.get('/api', (req, res) => {
  const currentDate = new Date();
  return res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  })
})

// handle date params
app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;
  
  // default try to convert string to date
  let convertedParam = new Date(dateParam);

  // if param is all numbers
  if (/^[0-9]+$/.test(dateParam)) {
    // cast string to number
    convertedParam = new Date(Number(dateParam));
  }

  // if date is invalid
  if (convertedParam == 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: convertedParam.getTime(),
    utc: convertedParam.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
