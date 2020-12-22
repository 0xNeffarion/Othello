const config = require('./config.js');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./' + config.db_name, (err) => {
    if(err){
        return console.error(err.message);
    }
});

module.exports.insertUser = function(user){
    db.run(`INSERT INTO users (name, password) VALUES ("${user.name}","${user.password}");`,
        function(err){
            if(!err){
                console.log("New user added with id " + this.lastID);
            }else{
                console.error(err.message);
            }
        }
    );
}

module.exports.closeDatabase = function() {
    db.close((err) => {
        if(err){
            return console.error(err.message);
        }
    });
}
