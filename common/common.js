const mysql = require('mysql');
const mssql = require('mssql');
const redis = require('redis');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const xlsx = require('node-xlsx');
const fs = require('fs');
const moment = require('moment');
const request = require('request');

//mongodb数据库连接配置
// const mongodburl = 'mongodb://10.81.36.167/weibo?poolSize=40';
const mongodburl = 'mongodb://localhost/weibo?poolSize=40';

// 回调方式连接
// mongoose.connect(mongodburl, (err) => {
//   if (err) return console.log(err);
//   console.log('mongodb连接成功!!!');
// });

//mongodb的Promise使用原生的Promise
mongoose.Promise = Promise;
mongoose.connect(mongodburl).then(() => {
  console.log('mongodb连接成功!!!');
}).catch((e) => {
  console.log(e);
});

//发送邮件配置
const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '452076103@qq.com',
    pass: 'xxxxxxxxxx',
  }
});

//redis连接配置
const redisClient = redis.createClient();
redisClient.on("error", function (err) {
  console.log("Error :", err);
});
redisClient.on('connect', function () {
  console.log('Redis连接成功!!!');
})

//mysql连接配置 
const mysqlCfg = mysql.createPool({
  connectionLimit: 10,
  host: '10.81.36.167',
  user: 'root',
  password: '123456',
  database: 'nodejs',
});

//sqlserver连接配置
const sqlserverCfg = {
  // user: 'sa',
  // password: '123456',
  // server: '10.81.36.167',
  user: 'xxxxx',
  password: 'xxxxx',
  server: 'xxxxxx',
  database: 'xxxxxx',
  // port: 1433,
  port: 3433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
};
mssql.connect(sqlserverCfg, (err, result) => {
  if (err) return console.log(err);
  console.log('sqlserver连接成功!!!');
});

class Ut {

  /**
   * mysql执行sql封装
   * @param {string} sql 
   * @return {Promise<[]>}
   */
  static mysqlQuery(sql) {

    return new Promise((resolve, reject) => {
      if (!sql) return reject({ message: '无sql' });
      mysqlCfg.query(sql, (err, rows, fields) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    })
  };

  /**
   * sqlserver执行sql封装
   * @param {string} sql 
   * @return {Promise<[]>}
   */
  static sqlserverQuery(sql) {
    if (!sql) return Promise.reject({ message: '无sql' });
    return new mssql.Request().query(sql);
  };

  /**
   * redis添加string类型的数据
   * @param {string} key 
   * @param {string} value 
   * @param {number} expire (过期时间,单位秒;可为空，为空表示不过期)
   * @return {Promise<[]>}
   */
  static redisSet(key, value, expire) {
    return new Promise((resolve, reject) => {
      redisClient.set(key, value, (err, result) => {

        if (err) return reject(err);

        if (!isNaN(expire) && expire > 0) {
          redisClient.expire(key, parseInt(expire));
        }

        return resolve(result);
      })
    })
  };

  /**
   * redis查询string类型的数据
   * @param {string} key
   * @return {Promise<[]>}
   */
  static redisGet(key) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, result) => {

        if (err) return reject(err);

        return resolve(result);
      });
    })
  };

  /**
   * 发送带附件的邮件
   * @param {string} xlsxname 
   * @return {Promise<[]>}
   */
  static sendMail(xlsxname) {
    const mailOptions = {
      from: '452076103@qq.com',
      to: `527828938@qq.com`,
      subject: '老板,您要的excel来了,格式您自己处理下!',
      html: `<h2>我发誓,我是手动导出的</h2>`,
      attachments: [{
        filename: xlsxname,
        path: `./${xlsxname}`
      }]
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return reject(error);
        return resolve(info);
      });
    });
  };

  /**
   * 生产xlsx文件
   * @param {array[][]} data
   * @return {Promise<[]>} 
   */
  static generateXlsx(data) {
    const xlsxBuffer = xlsx.build([{ name: "今天的收入", data: data }]);
    const xlsxname = `${moment(new Date()).format('YYYY-MM-DD')}.xlsx`;

    return new Promise((resolve, reject) => {
      fs.writeFile(xlsxname, xlsxBuffer, 'binary', (err) => {
        if (err) return reject(err);
        return resolve(xlsxname);
      });
    });
  };

  static jsonData() {
    const data = [{
      ID: 2,
      Name: '张三',
      Age: 20,
      Address: '四川省',
      Phone: '13546487455',
      QQ: '786495456'
    },
    {
      ID: 3,
      Name: '李四',
      Age: 25,
      Address: '江西省',
      Phone: '15846465465',
      QQ: '45649871'
    },
    {
      ID: 4,
      Name: '皋陶',
      Age: 30,
      Address: '唐朝',
      Phone: '15464897544',
      QQ: '465987998'
    },
    {
      ID: 5,
      Name: '李世民',
      Age: 55,
      Address: '唐朝',
      Phone: '14564679898',
      QQ: '465789364'
    },
    {
      ID: 6,
      Name: '刘邦',
      Age: 40,
      Address: '汉朝',
      Phone: '17865464648',
      QQ: '456489345'
    },
    {
      ID: 7,
      Name: '秦始皇',
      Age: 60,
      Address: '秦朝',
      Phone: '18456487484',
      QQ: '78465487'
    },
    {
      ID: 8,
      Name: '朱元璋',
      Age: 50,
      Address: '明朝',
      Phone: '13546488787',
      QQ: '684564884'
    }]
    return Promise.resolve(data);
  };

  /**
   * promise化request
   * @param {object} opts 
   * @return {Promise<[]>} 
   */
  static promiseReq(opts = {}) {
    return new Promise((resolve, reject) => {
      request(opts, (err, response, body) => {
        if (err) return reject(err);
        if (response.statusCode != 200) return reject("返回状态码不为200");
        return resolve(body);
      });
    });
  };

};

module.exports = Ut;