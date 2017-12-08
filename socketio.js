/**
 * 封装socket.io,为了获取server以便监听
 */
let socket_io = require('socket.io');

class Socketio {
  /**
   * 
   * @param {string} server 
   */
  static getSocketio(server) {
    let io = socket_io.listen(server);
    io.sockets.on('connection', (socket) => {
      console.log('连接成功');
      socket.on('click1', () => {
        console.log('监听点击事件');
        var datas = [1, 2, 3, 4, 5];
        socket.emit('click2', { datas: datas });
        socket.broadcast.emit('click2', { datas: datas });
      })
    })
  }
}

module.exports = Socketio;