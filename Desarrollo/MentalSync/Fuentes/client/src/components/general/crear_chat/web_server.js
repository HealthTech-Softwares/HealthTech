const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", function connection(ws) {
  console.log("Cliente conectado");

  ws.on("message", function incoming(message) {
    console.log("Mensaje recibido:", message);

    // Enviar el mensaje a todos los clientes conectados
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
