/**
 * http获取json接口数据
 */
let http = require('http');
// let url = 'http://www.baidu.com';
url = 'http://bot.unitrue.com.cn/service/hd/hdinfo?hdid=20028717&radioid=fmradio8';
http.get(url, (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
      `Status Code: ${statusCode}`);
  }else if (!/^application\/json/.test(contentType) && !/^text\/plain/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.log(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});