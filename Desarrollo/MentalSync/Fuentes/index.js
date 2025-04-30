import app from "./server/src/app.js";
import { PORT } from "./server/src/config.js";
import http from 'http';
import { setupWebSocketServer } from './server/websocket.js';

const httpServer = http.createServer(app);

setupWebSocketServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor HTTP y WebSocket escuchando en el puerto ${PORT}`);
});

process.on('uncaughtException', (error) => {
  console.error('ERROR NO CAPTURADO:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('RECHAZO DE PROMESA NO MANEJADO:', reason);
});
