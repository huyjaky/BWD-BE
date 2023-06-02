const express = require('express');
const multer = require('multer');
const common = require('../controllers/common');
const useAuth = require('../middlewares/useAuth');
const noneAuth = require('../controllers/noneAuth');
const Img = require('../controllers/Img');
const confirm = require('../controllers/confirm');
const listHouse = require('../controllers/listHouse');
const storage = require('../config/imgConfig');

let router = express.Router();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 30, // giới hạn tải lên là 10MB
    maxFiles: 80, // giới hạn số lượng file tối đa là 20
    maxParallelUploads: 20, // tải đồng thời tối đa 10 file
  }
});

let initRouter = (app) => {
  // API Server

  // getAPI
  router.get('/api/get/house/page/:_page', noneAuth.getHouse);
  router.get('/api/get/house/id/:id', noneAuth.getHouse);
  router.get('/api/get/house/page/', noneAuth.getHouse);
  router.get('/api/get/house/userid/favorite/:userid', useAuth.verify, listHouse.getHouseUserFavorite);
  router.get('/api/get/house/userid/:userid', useAuth.verify, listHouse.getHouseUser);


  router.get('/api/get/:model/:cond/:value', useAuth.verify, common.getDataCondition);
  router.get('/api/get/:model/:id', useAuth.verify, common.getData);
  router.get('/api/get/:model', useAuth.verify, common.getData);
  router.get('/api/img/path/*', Img.getImage);

  // deleteAPI
  router.post('/api/delete/:model/:id', useAuth.verify, common.deleteData);
  router.post('/api/delete/:model', useAuth.verify, common.deleteData);

  // patchAPI: cap nhat mot phan cua doi tuong
  router.patch('/api/modifier/:model/:id', useAuth.verify, common.modifierData);

  // postAPI
  router.post('/api/create/schedule', useAuth.verify, confirm.confirm)
  router.post('/api/create/:model', useAuth.verify, common.createData);
  router.post('/api/get/house/filter/:_page', noneAuth.Filter);


  // putAPI: thay doi toan bo doi tuong
  router.put('/api/modifier/:model/:id', useAuth.verify, common.modifierData);


  return app.use('/', router);
}

module.exports = initRouter;