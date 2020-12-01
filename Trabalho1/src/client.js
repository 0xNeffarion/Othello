const SERVER_URL = "http://twserver.alunos.dcc.fc.up.pt:8008/";

class Register{

    constructor(nick, pass){
        this.nick = nick;
        this.pass = pass;
    }

    getNick(){
        return this.nick;
    }

    getPass(){
        return this.pass;
    }

}

class Ranking {

    constructor(obj){
        Object.assign(this, obj);
    }

    getNick(){
        return this.nick;
    }

    getVictories(){
        return this.victories;
    }

    getGames(){
        return this.games;
    }

}

const status = function(response) {
    if(response.ok){
        return Promise.resolve(response);
    }

    return Promise.reject(new Error('Invalid status'));
}

const sendRequest = async function(method, key, data){
    var result = await fetch(SERVER_URL + key, {
            method: method,
            headers: { 
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: data 
        })
        .then(status)
        .then(response => response.json())
        .catch(console.log);

    return Object.values(result)[0];
}

const sendPOST = async function(key, data){
    return await sendRequest('POST', key, data);
}

const sendGET = async function(key, data){
    return await sendRequest('GET', key, data);
}