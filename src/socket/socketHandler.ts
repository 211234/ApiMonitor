import { Server } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';

let io: SocketIoServer;

// ... otras importaciones ...

function initSocket(server: Server): void {
    io = new SocketIoServer(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        transports: ['websocket'],
    });

    io.on('connection', (socket: Socket) => {
        console.log('Cliente conectado');

        // Nuevo evento para recibir datos de registro de usuario
        socket.on('registroUsuario', (data) => {
            console.log('Datos de registro de usuario recibidos:', data);
            // Puedes realizar cualquier acción adicional con los datos aquí
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
}

function emitSensorData(data: any): void {
    if (io) {
        io.emit('sensorData', data);
        console.log('Mensaje enviado');
    } else {
        console.log('Websocket not initialized');
    }
}

export { initSocket, emitSensorData };
