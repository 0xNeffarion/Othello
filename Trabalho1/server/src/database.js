const config = require('./config.js');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./' + config.db_name);

module.exports.insertUser = function(name, password){
    db.run("INSERT INTO users(name, password) VALUES(?)", [name, password],
        function(error){
            console.log("New user added with id " + this.lastID);
        }
    );
}