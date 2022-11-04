require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// mongo configuration
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(`mongoose readyState: ${mongoose.connection.readyState}`);

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: Number,
    unique: true,
    required: true,
  },
});

const URLModel = mongoose.model('URL', urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// handle existing short urls
app.get('/api/shorturl/:short', (req, res) => {
  URLModel.findOne({ short_url: req.params.short }, (err, foundURL) => {
    if (err) res.json({ error: err });
    
    if (foundURL) res.redirect(foundURL.original_url); // redirect to site if found
    else res.json({ error: 'No short URL found for the given input' }); // error if not found
  });
});

// handle submissions from form
app.post('/api/shorturl', (req, res) => {
  // https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url
  const isValidURL = (urlString) => {
    let correctProtocol;
    
    try { correctProtocol = new URL(urlString); } 
    catch(err) { return false; }

    // accept only urls that start with http/https
    return correctProtocol.protocol === 'http:' || correctProtocol.protocol === 'https:';
  };

  const submittedURL = req.body.url;
  console.log('\n', `user submitted url: ${submittedURL}`);

  if (isValidURL(submittedURL)) {
    console.log('submitted url is valid');
    // search for existing url
    URLModel.findOne({ original_url: submittedURL }, (err, existingURL) => {
      if (err) res.json({ error: err });
      console.log('existingURLData? ->', existingURL);
      // if url exists already, return stored data as response
      if (existingURL && existingURL.original_url == submittedURL) {
        console.log('this url already exists');
        res.json({ original_url: existingURL.original_url, short_url: existingURL.short_url });
      } else {
        // if url does not exist yet:
        console.log('this is a new url');
        // get url count before we store new url
        URLModel.estimatedDocumentCount((err, urlCount) => {
          if (err) res.json({ error: err });
          console.log(`number of links in db: ${urlCount}`);
          // store new url in db
          URLModel.create({ original_url: submittedURL, short_url: urlCount + 1 }, (err, storedURLData) => {
            if (err) res.json({ error: err });
            console.log('stored the url', storedURLData);
            console.log('redirecting...');
            // redirect to link info that was stored in db
            res.json({ original_url: storedURLData.original_url, short_url: storedURLData.short_url });
          });
        });
      }
    });
  } else {
    // url was not valid
    res.json({ error: "Invalid URL" });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
