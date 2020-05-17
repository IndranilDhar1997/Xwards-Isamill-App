const Config = {
    env: 'dev',
    dev: {
        RESTURL: 'http://178.128.115.241:7200',
        APPVERSION: '1.0',
        STATUS: {
            INIT: 0,
            LOGGED_IN: 10
        }
    },
    local: {
        RESTURL: 'http://d34aa958.ngrok.io',
        APPVERSION: '1.0',
        STATUS: {
            INIT: 0,
            LOGGED_IN: 10
        }
    }
}

export default Config;