const express = require('express');
const router = express.Router();
const async = require('async');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const request = require('request');
const Ut = require('../common/common.js');
const crawlerut = require('../sample/wechatcrawler/common.js');
const easou = 'http://book.easou.com/';

router.use((req, res, next) => {
  console.log('test路由');
  next();
})

/**
 * 发送邮件
 * http://localhost:3000/test/send
 */
router.get('/send', (req, res, next) => {
  let sql = 'select * from users';
  // Ut.mysqlQuery(sql)
  Ut.jsonData()
    .then((rows) => {
      let data = [['编号', '姓名', '年龄', '地址', '电话', '收入']];
      rows.forEach((row, index) => {
        let newRow = [];
        for (let key in row) {
          newRow.push(row[key]);
        };
        data.push(newRow);
      });
      return Promise.resolve(data);
    })
    .then((data) => {
      return Ut.generateXlsx(data);
    })
    .then((xlsxname) => {
      return Ut.sendMail(xlsxname);
    })
    .then((info) => {
      console.log(info);
      res.json('邮件发送成功!');
    })
    .catch((e) => {
      console.log(e);
      if (!e.message) e.message = '啊哦,好像出了点点小问题!';
      next(e);
    })
});


/**
 * 抓取搜狗微信网站
 * http://localhost:3000/test/crawler?public_num=支付宝
 */
router.get('/crawler', (req, res, next) => {
  let public_num = req.query.public_num || '支付宝';
  //任务数组
  let task = [];
  //根据public_num搜索公众号,最好是微信号或者微信全名.
  task.push((callback) => {
    crawlerut.search_wechat(public_num, callback)
  });
  //根据url获取公众号获取最后10条图文列表
  task.push((url, callback) => {
    crawlerut.look_wechat_by_url(url, callback)
  })
  //根据图文url获取详细信息,发布日期,作者,公众号,阅读量,点赞量等
  task.push((article_titles, article_urls, article_pub_times, callback) => {
    crawlerut.get_info_by_url(article_titles, article_urls, article_pub_times, callback)
  })
  //执行任务
  async.waterfall(task, (err, result) => {
    if (err) {
      if (!err.message) err.message = '啊哦,好像出了点点小问题!';
      return next(err);
    }
    console.log(result);
    res.json(result);
  })
});

/**
 * 小说介绍页
 * http://localhost:3000/test/index?id=23488
 */
router.get('/index', (req, res, next) => {
  console.log('首页');
  let q = req.query;
  let prefix_url = `http://www.81zw.com/book/${q.id}/`;
  let options = {
    url: prefix_url,
    encoding: "base64"
  };
  request.get(options, (err, response, body) => {
    if (err) {
      console.log(err);
      if (!err.message) err.message = '啊哦,好像出了点点小问题!';
      return next(err);
    }
    let html = iconv.decode(new Buffer(body, "base64"), "gbk");
    let $ = cheerio.load(html);
    let book_lists = $("#list dd").toArray();
    let book_length = book_lists.length;
    //所有章节
    let all_chapters = [];
    book_lists.forEach((book_list, index) => {
      let chapter_obj = { title: '', url: '' };
      chapter_obj.title = $($(book_list).find('a')[0]).text();
      chapter_obj.url = prefix_url + $($(book_list).find('a')[0]).attr('href');
      chapter_obj.local_url = 'info/' + $($(book_list).find('a')[0]).attr('href');
      all_chapters.push(chapter_obj);
    })
    req.all_chapters = all_chapters;
    req.recent_chapters = all_chapters.slice(book_length - 10, book_length).reverse();
    req.title = $("h1").text();
    req.author = $($("#info").find('p')[0]).text();
    req.stats = $($("#info").find('p')[1]).text().split(',')[0];
    req.lasttime = $($("#info").find('p')[2]).text();
    req.lastarticle = $($("#info").find('p')[3]).text();
    req.bookid = q.id;
    res.render('book', req);
  })
});

//文章页
router.get('/info/:id', (req, res) => {
  console.log('文章页');
  let id = req.params.id;
  let url = `http://www.81zw.com/book/${req.query.bookid}/${id}`;
  let options = {
    url: url,
    encoding: "base64"
  };
  request.get(options, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    let html = iconv.decode(new Buffer(body, "base64"), "gbk");
    let $ = cheerio.load(html, { decodeEntities: false });
    let content = $("#content").html().replace(/。.+?<br><br>/, '。<br><br>');
    let pt_prev = $($(".bottem1").find('a')[0]).attr('href');
    let mu_lu = $($(".bottem1").find('a')[1]).attr('href');
    let pt_next = $($(".bottem1").find('a')[2]).attr('href');
    if (mu_lu == pt_next) pt_next = '../index';
    if (mu_lu == pt_prev) pt_prev = '../index';
    let nr_title = $($(".bookname").find('h1')[0]).text();
    req.content = content;
    req.pt_prev = pt_prev;
    req.pt_next = pt_next;
    req.nr_title = nr_title;
    req.bookid = req.query.bookid;
    res.render('content', req);
  })
});


module.exports = router;