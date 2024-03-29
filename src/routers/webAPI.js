const express = require('express');
const multer = require('multer');
const common = require('../controllers/common');
const useAuth = require('../middlewares/useAuth');
const noneAuth = require('../controllers/noneAuth');
const Img = require('../controllers/Img');
const confirm = require('../controllers/confirm');
const listHouse = require('../controllers/listHouse');
const storage = require('../config/imgConfig');
const postImg = require('../controllers/postImg');
const modifier = require('../controllers/modifier');
const deleteHouse = require('../controllers/deleteHouse');
const createHouse = require('../controllers/createHouse');
const test = require('../controllers/test');
const schedule = require('../controllers/schedule');

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

  router.post('/api/create/schedule/host', useAuth.verify, schedule.CreateSchedule);
  router.post('/api/get/schedule/host', useAuth.verify, schedule.GetSchedule );
  router.post('/api/modifier/schedule/host', useAuth.verify, schedule.ModifierSchedule);
  router.post('/api/delete/scheduel/host', schedule.DeleteSchedule);

  router.post('/api/get/house/userid/favorite/:userid', useAuth.verify,listHouse.getHouseUserFavorite);
  router.post('/api/modifier/all/house', useAuth.verify, modifier.modifierHouse)
  router.post('/api/delete/house', useAuth.verify, deleteHouse.deleteHouse);
  router.get('/api/get/house/userid/:userid', useAuth.verify, listHouse.getHouseUser);

  router.post('/api/create/house/img', upload.array('files'), createHouse.postImgCreateHouse);
  router.post('/api/create/house/house', useAuth.verify, createHouse.createHouse);



  router.get('/api/get/:model/:cond/:value', useAuth.verify, common.getDataCondition);
  router.get('/api/get/:model/:id', useAuth.verify, common.getData);
  router.get('/api/get/:model', useAuth.verify, common.getData);
  router.get('/api/img/path/*', Img.getImage);

  // deleteAPI
  router.post('/api/delete/img', useAuth.verify, Img.deleteImg);

  router.post('/api/delete/:model/:id', useAuth.verify, common.deleteData);
  router.post('/api/delete/:model', useAuth.verify, common.deleteData);

  // patchAPI: cap nhat mot phan cua doi tuong
  router.patch('/api/modifier/:model/:id', useAuth.verify, common.modifierData);

  // postAPI
  router.post('/api/create/:model', useAuth.verify, common.createData);
  router.post('/api/get/house/filter/:_page', noneAuth.Filter);
  router.post('/api/get/house/modifier', upload.array('files') , postImg.postImgModifier);


  router.post('/api/post/img', upload.array('files'), postImg.postImg);
  // putAPI: thay doi toan bo doi tuong
  router.put('/api/modifier/:model/:id', useAuth.verify, common.modifierData);

  router.post('/api/test', test.test);

  return app.use('/', router);
}

module.exports = initRouter;