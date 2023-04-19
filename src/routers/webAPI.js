const express = require('express');
const multer = require('multer');
const example = require('../controllers/example');

let router = express.Router();

let initRouter = (app) => {
  router.get('/api/test', example.var1);

  return app.use('/', router);
}

module.exports = initRouter;