const express = require('express');
const multer = require('multer');

let router = express.Router();

let initRouter = (app) => {
  return app.use('/', router);
}

module.exports = initRouter;