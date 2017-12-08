const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('auth路由');
  //判断是否登陆
  if(req.cookies.login){
    next();
  }else{
    res.redirect('../index/main');
  };
});

/**
 * 退出登陆
 */
router.get('/loginout',(req,res,next)=>{
  res.cookie('login', '1', { maxAge: 1, httpOnly: true });
  res.redirect('../index/main');
});

/**
 * 后台主页
 */
router.get('/main',(req,res,next)=>{
  console.log('后台主页!');
  res.render('auth.ejs');
});


module.exports = router;