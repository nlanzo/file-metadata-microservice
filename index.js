var express = require('express');
var cors = require('cors');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const path = require('path');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
  // send response
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })

  // delete file after response
  fs.readdir('./uploads', (err, files) => {
    if (err) throw err;  
    for (const file of files) {
      fs.unlink(path.join('./uploads', file), (err) => {
        if (err) throw err;
      });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
