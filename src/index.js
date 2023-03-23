const connect = require('./connection');
const middlewares = require('./middlewares');

async function start(){
    const socket = await connect();
    await middlewares(socket);
}

start();