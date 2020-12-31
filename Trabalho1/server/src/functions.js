const database = require('./database.js');
const util = require('./util.js');

module.exports.ranking = function (req, res) {
  database.readUsers();
  console.log("a");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  database.writeUsers();
  res.end();
  return;

}

module.exports.register = async function (req, res) {
    let result = await util.extractBody(req);
    if (result === undefined || result === null || result === '' || !util.isJsonValid(result)) {
        this.error(req, res, "Data structure error");
        return;
    }

    let json = JSON.parse(result);
    if (json !== undefined && json !== null && json.nick !== undefined && json.nick !== null &&
        json.pass !== undefined && json.pass !== null) {
        let nick = json.nick;
        let pass = json.pass;

        if (!database.userExists(nick)) {
            let user = {
                nick: nick,
                hash: database.hashPassword(pass),
                games: 0,
                wins: 0
            }

            database.addUser(user);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write("{}");
            res.end();
            return;
        } else {
            this.error(req, res, "User registered with a different password");
            return;
        }
    }

    this.error(req, res, "Data structure error");
}

module.exports.error = function (req, res, message) {
    let err = {
        "error": message
    };

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(err));
    res.end();
}
