const express = require('express');
const multer = require('multer');
const common = require('../controllers/common');
const Auth = require('../controllers/Auth');

let router = express.Router();

let initRouter = (app) => {
  // Auth Server
  router.post('/api/login', Auth.Login);
  router.post('/api/refresh', Auth.Refresh);

  // API Server
  router.get('/api/get/:model/:id', common.getData);
  router.get('/api/get/:model', common.getData);
  router.delete('/api/delete/:model/:id', common.deleteData);
  router.delete('/api/delete/:model', common.deleteData);

  return app.use('/', router);
}

module.exports = initRouter;