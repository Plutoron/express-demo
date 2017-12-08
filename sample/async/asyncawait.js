let request = require('request');
let promiseReq = (url = 'http://www.baidu.com/') => {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      return resolve(response.statusCode);
    });
  });
};

let start = async function () {
  let r1 = await promiseReq();
  console.log('01', r1);
  let r2 = await promiseReq();
  console.log('02', r2);
  let r3 = await promiseReq();
  console.log('03', r3);
  let r4 = await promiseReq();
  console.log('04', r4);
  let r5 = await promiseReq();
  console.log('05', r5);
  let r6 = await promiseReq();
  console.log('06', r6);
  let r7 = await promiseReq();
  console.log('07', r7);
  let r8 = await promiseReq();
  console.log('08', r8);
  let r9 = await promiseReq();
  console.log('09', r9);
};

start();