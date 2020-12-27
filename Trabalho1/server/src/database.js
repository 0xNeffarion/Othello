const config = require('./config.js');
var fs = require('fs');
var crypto = require('crypto');

var DATABASE = new Array();

module.exports.User = class {

    constructor(nick, hash, games, wins){
        this.nick = nick;
        this.hash = hash;
        this.games = games;
        this.wins = wins;
    }

    getNickname(){
        return this.nick;
    }

    getHash(){
        return this.hash;
    }

    getGamesPlayed(){
        return this.games;
    }

    getWins(){
        return this.wins;
    }

}

module.exports.readUsers = function() {
    fs.readFile(config.db_name, function(err, data) {
        if(!err) {
            dados = JSON.parse(data.toString());
            if(dados != undefined && dados !== null){
                DATABASE = dados;

                console.log(data.toString());
            }
        }
    });
}

module.exports.writeUsers = function() {
    fs.writeFile(config.db_name, JSON.stringify(DATABASE), function(err) {
        if(err) {
            console.error(err);
        }
    });
}

module.exports.syncUsers = function() {
    this.writeUsers();
    this.readUsers();
}

module.exports.addUser = function(user) {
    DATABASE.push(user);
    this.writeUsers();
}

module.exports.checkUser = function(nick, rawPassword){
    var hash = hashPassword(rawPassword);

    for(var i = 0; i < DATABASE.length; i++){
        var user = DATABASE[i];
        if(user != undefined && user !== null && user.getNickname().equals(nick)){
            return hash.equals(user.getHash());
        }
    }

    return false;
}

module.exports.userExists = function(nick){
    for(var i = 0; i < DATABASE.length; i++){
        var user = DATABASE[i];
        if(user != undefined && user !== null && user.getNickname().equals(nick)){
            return true;
        }
    }

    return false;
}

module.exports.getUser = function(nick) {
    for(var i = 0; i < DATABASE.length; i++){
        var user = DATABASE[i];
        if(user != undefined && user !== null && user.getNickname().equals(nick)){
            return user;
        }
    }

    return null;
}

module.exports.hashPassword = function(password) {
    return crypto.createHash('sha256').update(password).digest('hex').trim();
}