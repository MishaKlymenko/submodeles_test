const net = require('net');
const readline = require('readline');

const PORT = 3000;
const HOST = '127.0.0.1';

const client = new net.Socket();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(PORT, HOST, () => {
    console.log(`Підключено до сервера ${HOST}:${PORT}`);
    console.log('Введіть повідомлення (або "exit" для виходу):');
    promptUser();
});

client.on('data', (data) => {
    console.log(data.toString());
    promptUser();
});

client.on('close', () => {
    console.log('З\'єднання закрито');
    rl.close();
    process.exit(0);
});

client.on('error', (err) => {
    console.error('Помилка підключення:', err.message);
    rl.close();
    process.exit(1);
});

function promptUser() {
    rl.question('> ', (input) => {
        if (input.toLowerCase() === 'exit') {
            client.destroy();
            return;
        }
        client.write(input);
    });
}
