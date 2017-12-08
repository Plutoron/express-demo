/**
 * 创建服务器
 * 引入http模块 
 * 创建http服务器 
 * 监听端口 
 */
let http = require('http');

http.createServer((request, response) => response.end('Hello World!\n')).listen(3001);

console.log('Server running at http://127.0.0.1:3001/');


// http.createServer(function (request, response) {

//   response.end('hello world\n');

// }).listen(3001);

// console.log('Server running at http://127.0.0.1:3001/'); 