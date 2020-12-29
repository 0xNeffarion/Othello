const config = require('./config.js');
const util = require('./util.js');
const fs = require('fs');
const crypto = require('crypto');


module.exports.readUsers = function () {
    global.DATABASE = [];
    fs.readFile(config.db_name, function (err, data) {
        if (!err) {
            const dados = JSON.parse(data.toString());
            if (dados !== undefined) {
                global.DATABASE = dados;
            }
        }
    });
}

module.exports.writeUsers = function () {
    fs.writeFile(config.db_name, JSON.stringify(global.DATABASE), function (err) {
        if (err) {
            console.error(err);
        }
    });
}

module.exports.syncUsers = function () {
    this.writeUsers();
    this.readUsers();
}

module.exports.addUser = function (user) {
    if (this.userExists(user.nick)) {
        return;
    }

    global.DATABASE.push(user);
    this.writeUsers();
}

module.exports.checkUser = function (nick, rawPassword) {
    const hash = this.hashPassword(rawPassword);

    for (let i = 0; i < global.DATABASE.length; i++) {
        const user = global.DATABASE[i];
        if (user !== undefined && user !== null && user.nick === nick) {
            return hash === user.hash;
        }
    }

    return false;
}

module.exports.userExists = function (nick) {
    for (let i = 0; i < global.DATABASE.length; i++) {
        const user = global.DATABASE[i];
        if (user !== undefined && user !== null && user.nick === nick) {
            return true;
        }
    }

    return false;
}

module.exports.getUser = function (nick) {
    for (let i = 0; i < global.DATABASE.length; i++) {
        const user = global.DATABASE[i];
        if (user !== undefined && user !== null && user.nick === nick) {
            return user;
        }
    }

    return null;
}

module.exports.hashPassword = function (password) {
    return crypto.createHash('sha256').update(password).digest('hex').trim();
}