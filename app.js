const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const test = require('./routes/test');
const auth = require('./routes/auth');

const app = express();
console.log('express start!');
// view engine setup
// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// 页面 favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 开发模式,会打印很多有用的基本信息
app.use(logger('dev'));
// post请求处理模块
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie处理模块
app.use(cookieParser());
// 项目静态资源路径,可以设置多个
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

//项目路由控制
app.use('/index', index);
app.use('/users', users);
app.use('/test', test);
app.use('/auth', auth);

// catch 404 and forward to error handler
// 处理所有未被匹配到的url
app.use((req, res, next) => {
  console.log('发现未被匹配到的url');
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// 如果是开发环境 打印出详细的错误信息
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// 如果是生产环境 不显示详细信息给用户
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
