const express = require('express');
const multer = require('multer');
const common = require('../controllers/common');
const useAuth = require('../controllers/useAuth');

let router = express.Router();

let initRouter = (app) => {
  // API Server

  // getAPI
  router.get('/api/get/:model/:id', useAuth.verify, common.getData);
  router.get('/api/get/:model', useAuth.verify, common.getData);

  // deleteAPI
  router.delete('/api/delete/:model/:id', useAuth.verify, common.deleteData);
  router.delete('/api/delete/:model', useAuth.verify, common.deleteData);

  // patchAPI: cap nhat mot phan cua doi tuong

  // postAPI
  router.post('/api/create/:model', useAuth.verify, common.createData);
  router.post('/api/modifier/:model/:id', useAuth.verify, common.modifierData);

  // putAPI: thay doi toan bo doi tuong


  return app.use('/', router);
}

module.exports = initRouter;