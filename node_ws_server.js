const WebSocket = require('ws');
const colors = require('./colors');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  colors.COLORS.forEach( color => ws.send("rgb("+color.join(",")+")"));
});
