const express = require('express');
const multer = require('multer');
const common = require('../controllers/common');
const Auth = require('../controllers/Auth');
const useAuth = require('../controllers/useAuth');

let router = express.Router();

let initRouter = (app) => {
  // Auth Server
  router.post('/api/login', Auth.Login);
  router.post('/api/refresh', Auth.Refresh);
  router.get('/api/logout', Auth.Logout);

  // API Server

  // getAPI
  router.get('/api/get/:model/:id', useAuth.verify, common.getData);
  router.get('/api/get/:model', useAuth.verify, common.getData);

  // deleteAPI
  router.delete('/api/delete/:model/:id', useAuth.verify, common.deleteData);
  router.delete('/api/delete/:model', useAuth.verify, common.deleteData);

  // patchAPI: cap nhat mot phan cua doi tuong

  // postAPI

  // putAPI: thay doi toan bo doi tuong


  return app.use('/', router);
}

module.exports = initRouter;