let request = require('request');
let async = require('async');
const url = 'http://www.baidu.com/';

let task = [];
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('01', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('02', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('03', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('04', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('05', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('06', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('07', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('08', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('09', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('10', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('11', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('12', response.statusCode);
    callback();
  });
});
task.push((callback) => {
  request(url, (err, response, body) => {
    console.log('13', response.statusCode);
    callback();
  });
});

async.waterfall(task, (err, result) => {
  console.log('执行完成');
});