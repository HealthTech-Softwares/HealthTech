// server/websocket.js
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from './src/config.js';
import url from 'url';
import db from './src/db.js';

// Map para rastrear conexiones: userId -> Set de conexiones WebSocket activas
const connectedPsychologists = new Map();

export function setupWebSocketServer(httpServer) {
    const wss = new WebSocketServer({ server: httpServer });
    console.log('[WebSocket] Servidor iniciado y adjunto al servidor HTTP.');

    wss.on('connection', (ws, req) => {
        let userId = null;
        let userRole = null;

        try {
            // 1. Autenticar la conexión usando token en la URL
            const parameters = url.parse(req.url, true).query;
            const token = parameters.token;

            if (!token) {
                console.log('[WebSocket] Conexión sin token. Cerrando.');
                ws.close(1008, 'Token requerido');
                return;
            }

            const decoded = jwt.verify(token, TOKEN_SECRET);
            userId = decoded.id;
            userRole = decoded.rol;

            // 2. Rastrear SOLAMENTE si es un Psicólogo
            if (userRole === 'Psicologo') {
                console.log(`[WebSocket] Psicólogo ${userId} conectado.`);
                if (!connectedPsychologists.has(userId)) {
                    connectedPsychologists.set(userId, new Set());
                }
                connectedPsychologists.get(userId).add(ws);

                // Opcional: Enviar confirmación al cliente
                ws.send(JSON.stringify({ type: 'auth_success', message: 'Conectado y autenticado como Psicólogo.' }));

            } else {
                 console.log(`[WebSocket] Usuario ${userId} (${userRole}) conectado, pero no rastreado para notificaciones de cita.`);
                 // Opcional: Enviar mensaje informativo
                 ws.send(JSON.stringify({ type: 'connection_ok', message: 'Conectado, pero no recibirá notificaciones de citas.' }));
            }

        } catch (err) {
            // Manejo específico si el token expiró o es inválido
            const reason = err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';
            console.error(`[WebSocket] Autenticación fallida (${reason}). Cerrando conexión. Error: ${err.message}`);
            ws.close(1008, reason); // 1008: Policy Violation
            return;
        }

        // 3. Manejar cierre de conexión
        ws.on('close', (code, reason) => {
            // Convertir reason (Buffer) a string si existe
            const reasonString = reason ? reason.toString() : 'Razón desconocida';
             if (userRole === 'Psicologo' && userId && connectedPsychologists.has(userId)) {
                console.log(`[WebSocket] Psicólogo ${userId} desconectado. Código: ${code}, Razón: ${reasonString}`);
                const connections = connectedPsychologists.get(userId);
                connections.delete(ws);
                if (connections.size === 0) {
                    connectedPsychologists.delete(userId);
                     console.log(`[WebSocket] Última conexión cerrada para Psicólogo ${userId}.`);
                }
            } else if (userId) {
                 console.log(`[WebSocket] Usuario ${userId} (${userRole}) desconectado. Código: ${code}, Razón: ${reasonString}`);
            } else {
                 console.log(`[WebSocket] Cliente no autenticado desconectado. Código: ${code}, Razón: ${reasonString}`);
            }
        });

        // 4. Manejar errores de la conexión WebSocket
        ws.on('error', (error) => {
            console.error(`[WebSocket] Error en conexión (Usuario ${userId || 'desconocido'}):`, error);
            // Limpiar la conexión si aún existe y pertenece a un psicólogo rastreado
             if (userRole === 'Psicologo' && userId && connectedPsychologists.has(userId)) {
                 const connections = connectedPsychologists.get(userId);
                 if (connections.has(ws)) {
                    connections.delete(ws);
                    if (connections.size === 0) {
                        connectedPsychologists.delete(userId);
                    }
                    console.log(`[WebSocket] Conexión con error eliminada para Psicólogo ${userId}.`);
                 }
             }
            // Considera cerrar la conexión si no se cierra automáticamente tras un error
            if (ws.readyState === ws.OPEN || ws.readyState === ws.CONNECTING) {
                 ws.terminate();
             }
        });

        // 5. Manejar mensajes entrantes (Ejemplo: para ping/pong futuro)
        ws.on('message', (message) => {
            // Los mensajes suelen ser Buffers, convertimos a string
            const messageString = message.toString();
            console.log(`[WebSocket] Mensaje de ${userId} (${userRole}): ${messageString}`);
             try {
                const parsedMessage = JSON.parse(messageString);
                 if (parsedMessage.type === 'ping') {
                     ws.send(JSON.stringify({ type: 'pong' }));
                 }
             } catch (e) {
                 console.log("[WebSocket] Mensaje recibido no es JSON o tipo desconocido.");
             }
        });
    });
}

// Función para enviar notificación a un psicólogo específico por su userId
export async function notifyPsychologist(psychologistUserId, notificationPayload) {
    if (!psychologistUserId) {
        console.warn('[WebSocket Notify] Se intentó notificar sin psychologistUserId.');
        return;
    }

    if (connectedPsychologists.has(psychologistUserId)) {
        const connections = connectedPsychologists.get(psychologistUserId);
        if (connections.size > 0) {
            console.log(`[WebSocket Notify] Enviando notificación a ${connections.size} conexiones del psicólogo ${psychologistUserId}`);
            const message = JSON.stringify({
                type: 'new_cita_notification', // Tipo claro para el cliente
                payload: notificationPayload
            });

            // Usamos un Set temporal para iterar y poder borrar mientras iteramos
            const connectionsToSend = new Set(connections);
            connectionsToSend.forEach(client => {
                if (client.readyState === 1) { // 1 es WebSocket.OPEN
                    client.send(message, (err) => {
                        if (err) {
                             console.error(`[WebSocket Notify] Error enviando a una conexión del psicólogo ${psychologistUserId}:`, err);
                             // Si hay error al enviar, probablemente la conexión murió, la eliminamos
                             connections.delete(client);
                              if (connections.size === 0) {
                                connectedPsychologists.delete(psychologistUserId);
                            }
                         }
                     });
                } else {
                    // Limpiar conexiones obsoletas encontradas al intentar enviar
                    console.warn(`[WebSocket Notify] Eliminando conexión no abierta para psicólogo ${psychologistUserId}`);
                    connections.delete(client);
                     if (connections.size === 0) {
                        connectedPsychologists.delete(psychologistUserId);
                    }
                }
            });
            // Si después de intentar enviar, el Set original quedó vacío, lo eliminamos del Map
             if (connections.size === 0) {
                console.log(`[WebSocket Notify] No quedaron conexiones activas para ${psychologistUserId} después del envío.`);
                connectedPsychologists.delete(psychologistUserId);
            }

        } else {
             // Esto no debería pasar si el Map se limpia correctamente, pero por si acaso
             console.log(`[WebSocket Notify] No hay conexiones activas para psicólogo ${psychologistUserId}, aunque la entrada existía. Limpiando.`);
             connectedPsychologists.delete(psychologistUserId);
        }
    } else {
        console.log(`[WebSocket Notify] Psicólogo ${psychologistUserId} no tiene conexiones WebSocket activas.`);
    }
}

// Función auxiliar para obtener el userId de un psicólogo desde su idpsicologo
// Devuelve el idusuario o null
export async function getUserIdForPsychologist(idpsicologo) {
    if (!idpsicologo) return null;
    try {
        // Usamos db.oneOrNone para manejar el caso de que no se encuentre
        const user = await db.oneOrNone('SELECT idusuario FROM psicologo WHERE idpsicologo = $1', [idpsicologo]);
        // Si user es null (no encontrado), devuelve null. Si no, devuelve user.idusuario
        return user ? user.idusuario : null;
    } catch (error) {
        // Loguea el error pero devuelve null para no detener el flujo principal
        console.error(`[DB Error] Buscando idusuario para idpsicologo ${idpsicologo}:`, error);
        return null;
    }
}
