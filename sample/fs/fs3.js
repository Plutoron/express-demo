/**
 * 读取文件
 */
let fs = require('fs');
let array = [{ name: '江西', age: 20000, sex: "男", url: "http://blog.csdn.net/zzwwjjdj1/" }];
fs.readFile('abc.txt', (err, data) => {
  if (err) return console.log(err);
  console.log(data.toString());
});