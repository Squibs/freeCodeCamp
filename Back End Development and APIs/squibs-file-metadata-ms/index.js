const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({
  // dest: './public/data/uploads', // if you want to write files on server
  limits: {
    fileSize: 1048576,
    fieldNameSize: 300,
  },
});
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
