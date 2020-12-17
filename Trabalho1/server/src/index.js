const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const url = require('url');
const stream = require('stream');
const config = require('./config.js');
const util = require('./util.js');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
}).listen(config.port);