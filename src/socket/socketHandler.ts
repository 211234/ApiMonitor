import { Server } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';

let io: SocketIoServer;

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
