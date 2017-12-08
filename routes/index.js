const express = require('express');
const router = express.Router();
const fs = require('fs');
const formidable = require('formidable');
const multer = require('multer');

//上传文件配置
const storage = multer.diskStorage({
  //文件存储位置
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  //文件名
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.ceil(Math.random() * 1000)}-multer.${file.originalname.split('.').pop()}`);
  }
});
const uploadCfg = {
  storage: storage,
  limits: {
    //上传文件的大小限制,单位bytes
    fileSize: 1024 * 1024 * 2
  }
};

router.use((req, res, next) => {
  console.log('index路由');
  next();
});

//http://localhost:3000/index/main
router.get('/main', (req, res, next) => {
  res.render('main');
});

/**
 * 登陆
 */
router.get('/login', (req, res, next) => {
  res.cookie('login', '1', { maxAge: 10 * 1000, httpOnly: true });
  res.redirect('../auth/main');
});

/**
 * http://localhost:3000/index/body
 */
router.get('/body', (req, res, next) => {
  res.render('body');
});

/**
 * 测试get参数
 * http://localhost:3000/index/query?q=123&w=456
 */
router.get('/query', (req, res, next) => {
  console.log('get请求参数对象 :', req.query);
  console.log('post请求参数对象 :', req.body);
  console.log('q的值为 :', req.query.q);
  res.json(req.query);
});

/**
 * 测试post参数
 */
router.post('/body', (req, res, next) => {
  console.log('get请求参数对象 :', req.query);
  console.log('post请求参数对象 :', req.body);
  console.log('q的值为 :', req.body.q);
  res.json(req.body);
})

/**
 * 测试url参数
 * http://localhost:3000/index/test/url2
 */
router.get('/test/:urlname', function (req, res, next) {
  console.log('url参数对象 :', req.params);
  console.log('get请求参数对象 :', req.query);
  console.log('post请求参数对象 :', req.body);
  console.log('q的值为 :', req.params.urlname);
  res.json(req.params);
});

/**
 * 测试下载文件
 * http://localhost:3000/index/download?type=1
 * http://localhost:3000/index/download?type=jpg
 * http://localhost:3000/index/download?type=txt
 */
router.get('/download', (req, res, next) => {
  var q = req.query;
  if (q.type == 'jpg') {
    //相对路径  
    res.download('public/1.jpg');
  } else if (q.type == 'txt') {
    //绝对路径  
    res.download(`d:/各种总结/nodejs培训/samples/public/1.txt`);
  } else {
    next({ message: "啊哦,好像出了点点小问题!" });
  }
});

/**
 * 上传文件页
 * http://localhost:3000/index/upload
 */
router.get('/upload', (req, res, next) => {
  res.render('upload');
})
/**
 * multer文件上传
 */
router.post('/upload1', (req, res, next) => {
  let upload = multer(uploadCfg).single('headPicture');
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      if (!err.message) e.message = '啊哦,好像出了点点小问题!';
      next(err);
    };
    console.log(req.file);
    res.redirect(`/${req.file.path}`);
  });
});

/**
 * formidable文件上传
 */
router.post('/upload2', (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.uploadDir = "uploads/";
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      if (!err.message) e.message = '啊哦,好像出了点点小问题!';
      next(err);
    };
    console.log(files);
    let file = files['headPicture'];
    let fileName = `uploads/${Date.now()}-${Math.ceil(Math.random() * 1000)}-formidable.${file.name.split('.').pop()}`;
    let fileStream = fs.createReadStream(file.path);
    fileStream.pipe(
      fs.createWriteStream(fileName)
    );
    fileStream.on('end', () => {
      fs.unlink(file.path);
      res.redirect(`/${fileName}`);
    });
  });
});

/**
 * socket.io测试
 * http://localhost:3000/index/io
 */
router.get('/io', (req, res, next) => {
  res.render('io', { title: 'socket.io测试' });
})
module.exports = router;
