/**
 * http获取页面代码
 */
let http = require('http');

let url = 'http://www.baidu.com/';
http.get(url, (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
      `Status Code: ${statusCode}`);
  }
  if (error) {
    console.log(error.message);
    // consume response data to free up memory
    return res.resume();
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => console.log(rawData));
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});