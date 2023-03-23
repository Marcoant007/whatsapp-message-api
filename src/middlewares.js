const { BOT_EMOJI } = require('./config');
const {isCommand, extractDataFromMessage} = require('./utils/index')

async function middlewares(socket){
    socket.ev.on('messages.upsert', async ({messages}) => {
        console.log(messages);
        const baileysMessage = messages[0];

        if(!baileysMessage?.message){
            return;
        }

        const  { command, remoteJid } = extractDataFromMessage(baileysMessage);

        switch(command.toLowerCase()){
            case 'ping':
                await socket.sendMessage(remoteJid, {text: `${BOT_EMOJI} FALA COM MEU BOTZINHO FALA`})
                break
        }
    })
}

module.exports = middlewares;