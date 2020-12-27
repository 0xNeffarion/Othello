const http = require('http');
const url = require('url');
const functions = require('./functions.js');
const config = require('./config.js');

functions.readDatabase();

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url,true);
    const pathname = parsedUrl.pathname;

    if(req.method === 'GET'){
        switch(pathname) {
            case '/ranking':
                functions.ranking(req, res);
                break;
            default:
                functions.error(req, res);
                break;
        }
    }else if(req.method === 'POST'){
        switch(pathname) {
            case '/register':
                functions.register(req, res);
                break;
            default:
                functions.error(req, res);
                break;
        }
    }else{
        functions.error(req, res);
    }

    res.end();
}).listen(config.port);

const closeServer = function(){
    console.log('Closing server...');
    server.close();
    console.log('Server closed.');
}

process.on('SIGTERM', () => {
    closeServer();
});

process.on('SIGINT', () => {
    closeServer();
});

