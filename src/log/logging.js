// const log = require('simple-node-logger').createSimpleLogger('./user-email.log');

module.exports = function (fileName) {

    const SimpleNodeLogger = require('simple-node-logger'),
        opts = {
            logFilePath: './src/log/' + fileName,
            timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
        },
        log = SimpleNodeLogger.createSimpleFileLogger(opts);

    function info(str) {
        
            log.info(str);
        
    }
    return ({ info })
}
