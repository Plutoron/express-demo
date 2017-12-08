let request = require('request');
let promiseReq = (url = 'http://www.baidu.com/') => {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      return resolve(response.statusCode);
    });
  });
};

promiseReq()
  .then((data) => {
    console.log('01', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('02', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('03', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('04', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('05', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('06', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('07', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('08', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('09', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('10', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('11', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('12', data);
    return promiseReq();
  })
  .then((data) => {
    console.log('13', data);
    return promiseReq();
  })
  .catch((e) => console.log(e))