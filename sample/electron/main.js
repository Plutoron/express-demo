const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

//指向窗口对象的一个全局引用，如果没有这个引用，那么当该javascript对象被垃圾回收的时候该窗口将会自动关闭
let win = null;

let createWindow = () => {
  // 创建一个浏览器窗口
  // win = new BrowserWindow({ width: 372, height: 708 });
  //无边框
  win = new BrowserWindow({ width: 358, height: 750 , frame: false});
  // win = new BrowserWindow({ width: 358, height: 803 , frame: false,transparent: true});

  // 加载 index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // 打开调试工具
  // win.webContents.openDevTools();

  // 监听窗口关闭
  win.on('closed', () => win = null);
};

app.on('ready', createWindow);

// 所有窗口关闭,程序退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  };
});