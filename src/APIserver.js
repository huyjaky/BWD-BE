const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');
const cors = require('cors');
require('dotenv').config();
const https = require('https');
const path = require('path');
const fs = require('fs');
const router = require('./routers/webAPI')

let app = express();
app.use(cors());

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
router(app);



const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../cert2', '/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert2', '/cert.pem')),
}, app)

let port = process.env.API_PORT || 8080;
sslServer.listen(port, () => {
  console.log('API server listening on port ', port);
});

