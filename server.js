const net = require('net');

const PORT = 3000;
const HOST = '127.0.0.1';

const server = net.createServer((socket) => {
    console.log(`Клієнт підключився: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log(`Отримано: ${message}`);
        
        // Відправляємо echo відповідь
        socket.write(`ECHO: ${message}\n`);
    });

    socket.on('end', () => {
        console.log('Клієнт від\'єднався');
    });

    socket.on('error', (err) => {
        console.error('Помилка сокета:', err.message);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Echo сервер запущено на ${HOST}:${PORT}`);
    console.log('Очікування підключень...');
});

server.on('error', (err) => {
    console.error('Помилка сервера:', err.message);
});
