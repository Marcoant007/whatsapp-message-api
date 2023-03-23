const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@adiwajshing/baileys');


async function connect(){

    //Salvando o stado
    const {state, saveCreds } = await useMultiFileAuthState('./assets/auth/baileys');

    const socket = makeWASocket({
        printQRInTerminal: true,
        auth: state, 
        defaultQueryTimeoutMs: undefined
    });

    socket.ev.on('connection.update', (update) => {
        const {connection, lastDisconnect} = update;
        if(connection === 'close'){
            const shouldReconnect = lastDisconnect.error?.output?.statusCode === DisconnectReason.loggedOut;
            if(shouldReconnect){
                connect();
            }
        }
    })

    //toda vez que as credenciais forem atualizadas, vai atualizar.
    socket.ev.on('creds.update', saveCreds);

    return socket 
}

module.exports = connect;