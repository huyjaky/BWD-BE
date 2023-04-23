const express = require('express');
const multer = require('multer');
const commonAction = require('../controllers/commonAction');

let router = express.Router();

let initRouter = (app) => {
  router.get('/api/get/:model/:id', commonAction.getData);
  router.get('/api/get/:model', commonAction.getData);
  router.delete('/api/delete/:model/:id', commonAction.deleteData);
  router.delete('/api/delete/:model', commonAction.deleteData);

  return app.use('/', router);
}

module.exports = initRouter;