const express = require('express');
const router = express.Router();
const moment = require('moment');
const Ut = require('../common/common.js');
const Microblog = require('../common/schemesmodels.js');

router.use((req, res, next) => {
  console.log('users路由');
  next();
})
/**
 * js桌面应用 : electron heX AIR NW  node-webkit
 * 硬件 : Ruff
 * APP : phonegap 
 * mysql测试  sequelize orm2
 * http://localhost:3000/users/mysql
 */
router.get('/mysql', (req, res, next) => {
  let sql = 'select * from users';
  Ut.mysqlQuery(sql)
    .then((rows) => {
      console.log(rows);
      res.json(rows);
    })
    .catch((e) => {
      console.log(e);
      if (!e.message) e.message = '啊哦,好像出了点点小问题!';
      next(e);
    })
});

/**
 * sqlserver测试
 * http://localhost:3000/users/sqlserver
 */
router.get('/sqlserver', (req, res, next) => {
  let sql = 'select * from XCrawlerTaskSet';
  Ut.sqlserverQuery(sql)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      if (!e.message) e.message = '啊哦,好像出了点点小问题!';
      next(e);
    })
});

/**
 * redis测试1
 * http://localhost:3000/users/redisget
 */
router.get('/redisget', (req, res, next) => {
  let key = 'abc';
  Ut.redisGet(key)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      if (!e.message) e.message = '啊哦,好像出了点点小问题!';
      next(e);
    })
});

/**
 * redis测试2
 * http://localhost:3000/users/redisset
 */
router.get('/redisset', (req, res, next) => {
  let key = 'abc';
  let value = 'abc的值';
  let expire = 30;
  Ut.redisSet(key, value, expire)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      if (!e.message) e.message = '啊哦,好像出了点点小问题!';
      next(e);
    })
});

/**
 * mongodb测试
 * http://localhost:3000/users/mongodb
 */
router.get('/mongodb', (req, res, next) => {
  let _microblog = {
    connect: '这是一条新的微博!!!',
    createDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    userid: Math.ceil(Math.random() * 100)
  };
  let microblog = new Microblog(_microblog);

  microblog.save()
    .then((data) => {
      console.log('插入的数据为 : ' + data);
    })
    .then(() => {
      return Microblog.fetch();
    })
    .then((data) => {
      console.log('读取到的数据为 : ', data);
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      if (!e.message) e.message = '啊哦,好像出了点点小问题!';
      next(e);
    });

});

module.exports = router;
