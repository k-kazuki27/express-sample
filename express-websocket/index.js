const WsServer = require('ws').Server;
const server = new WsServer({ port: 3001 });

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received: ' + message);

    server.clients.forEach((client) => {
      client.send('接続しているクライアント全てに送信');
    });

    if (message === 'hello') {
      ws.send('hello from server', (res) => {
        console.log('callback', res);
      });
    }
  });
  // 接続が切れた場合
  ws.on('close', () => {
    console.log('I lost a client');
  });
  // エラー場合
  ws.on('error', () => {
    console.log('Error!');
  });
});

setInterval(function () {
  server.clients.forEach((client) => {
    client.send('定期送信');
  });
}, 5000);
