/**
 * 在文件内容后追加指定内容
 */
let fs = require('fs');
let array = [{ name: '江西', age: 20000, sex: "男" ,url:"http://blog.csdn.net/zzwwjjdj1/"}];
fs.appendFile('abc.txt', JSON.stringify(array, undefined, 2) + '\n', (err) => {
  if (err) return console.log(err);
  console.log('成功');
});