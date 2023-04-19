const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine');
const cors = require('cors');
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const router = require('./routers/webAPI')

let app = express();
app.use(cors());

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
router(app);

let port = process.env.AUTH_PORT || 8080;
app.listen(port, () => {
  console.log('Auth server listening on port ', port);
});


