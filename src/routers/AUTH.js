const express = require('express');
const multer = require('multer');
const Auth = require('../controllers/Auth');

let router = express.Router();

let initRouter = (app) => {
  // Auth Server
  router.post('/api/login', Auth.Login);
  router.post('/api/refresh', Auth.Refresh);
  router.get('/api/logout', Auth.Logout);
  return app.use('/', router);
}

module.exports = initRouter;