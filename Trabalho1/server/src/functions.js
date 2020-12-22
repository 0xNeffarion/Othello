const db = require('./database.js');
const util = require('./util.js');

module.exports.ranking = function(req, res){

}

module.exports.register = async function(req, res){
    console.log(await util.extractBody(req));
}

module.exports.error = function(req, res, message){
    res.writeHead(400, {'Content-Type': 'text/plain'});
}

module.exports.closeDB = function() {
    db.closeDatabase();
}