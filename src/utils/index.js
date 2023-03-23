const { PREFIX } = require("../config");


function extractDataFromMessage(baileysMessage){
    const textMessage = baileysMessage.message?.conversation;
    const extendedTextMessage = baileysMessage.message?.extendedTextMessage?.text;
    const imageTextMessage = baileysMessage.message?.imageMessage?.caption;
    const fullMessage = textMessage || extendedTextMessage || imageTextMessage;
    if(!fullMessage){
        return {
            remoteJid: '',
            fullMessage: '',
            command: '',
            args: '',
            isImage: false
        };
    }

    const isImage = !!baileysMessage.message?.imageMessage || 
    !!baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage

    const [command, ...args] = fullMessage.trim().split(' ');
    const arg = args.reduce((acc, arg) => acc + ' ' + arg, '').trim();
    return {
        remoteJid: baileysMessage?.key?.remoteJid,
        fullMessage,
        command: command.replace(PREFIX, '').trim(),
        args: arg.trim(),
        isImage
    }
}

function isCommand(baileysMessage){
    const {fullMessage} = extractDataFromMessage(baileysMessage);
    return fullMessage && fullMessage.startsWith(PREFIX);
}

module.exports = {
    extractDataFromMessage,
    isCommand
}