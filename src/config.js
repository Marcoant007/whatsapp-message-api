const path =  require('path');

const PREFIX = '/';
const BOT_EMOJI = '🤖';
const TEMP_FOLDER = path.resolve(__dirname, '..', 'assets', 'tmp');

module.exports = {
    PREFIX,
    TEMP_FOLDER,
    BOT_EMOJI
}
