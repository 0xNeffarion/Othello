const util = require('./database.js');

module.exports.ranking = function(req, res){

}

module.exports.register = function(req, res){
    
}

module.exports.error = function(req, res, message){
    res.writeHead(400, {'Content-Type': 'text/plain'});
}