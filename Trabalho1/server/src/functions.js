const db = require('./database.js');
const util = require('./util.js');

module.exports.readDatabase = function(){
    db.readUsers();
}

module.exports.ranking = function(req, res){
    console.log();
}

module.exports.register = async function(req, res){
    console.log(await util.extractBody(req));
}

module.exports.error = function(req, res, message){
    res.writeHead(400, {'Content-Type': 'text/plain'});
}
