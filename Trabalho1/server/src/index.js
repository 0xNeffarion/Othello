const http = require('http');
const crypto = require('crypto');
const url = require('url');
const stream = require('stream');
const functions = require('./functions.js');
const config = require('./config.js');
const util = require('./util.js');

http.createServer(function (req, res) {
    const parsedUrl = url.parse(request.url,true);
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


