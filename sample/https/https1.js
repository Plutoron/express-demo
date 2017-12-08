const https = require('https');
let url = 'https://www.baidu.com/';
https.get(url, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  let html = '';
  res.on('data', (d) => {
    html += d
  });
  res.on('end', () => console.log(html))
}).on('error', (e) => {
  console.error(e);
});