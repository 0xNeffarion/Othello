
const SERVER_PORT = 8008;
const SERVER = "twserver.alunos.dcc.fc.up.pt";
const SERVER_URL = "http://" + SERVER +  ":" + SERVER_PORT + "/";
const SERVER_WS = "ws://" + SERVER +  ":" + SERVER_PORT + "/";

const GRUPO = 57;

var currentGame = null;
var utilizador = null;


class Update {

    constructor(serverBoard, turn){
        this.serverBoard = serverBoard;
        this.turn = turn;
    }

    getServerBoard(){
        return this.serverBoard;
    }

    getTurn(){
        return this.turn;
    }

    getRealBoard(){
        return translateBoard(this.getServerBoard());
    }

}

class Game {

    constructor(id, color, updateEvent){
        this.id = id;
        this.color = color;
        this.updateEvent = updateEvent;
    }

    getUpdateEvent(){
        return this.updateEvent;
    }

    getColor(){
        return this.color;
    }

    getID(){
        return this.id;
    }

}

class User{

    constructor(nick, pass){
        this.nick = nick;
        this.pass = pass;
    }

    getNickname(){
        return this.nick;
    }

    getPassword(){
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

    if(result != null && result != undefined){
        return Object.values(result);
    }

    return null;
}

const sendPOST = async function(key, data){
    return await sendRequest('POST', key, data); 
}

const sendGET = async function(key, data){
    return await sendRequest('GET', key, data);
}

const setupEvent = function(key, args, fn){
    var eventSource = new EventSource(SERVER_URL + key + "?" + args);
    eventSource.onmessage = fn;
    
    return eventSource;
}

const updateGameEvent = function(event){
    const data = JSON.parse(event.data);
    var u = new Update(data.board, data.turn);
    console.log(u);

    console.log(u.getRealBoard());
}

const translateBoard = function(serverBoard){
    board = new Array(ROWS);

    for(let i = 0; i < COLS; i++){
        board[i] = constructRows();
    }

    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            var v = serverBoard[i][j];
            if(v == "empty"){
                board[i][j] = EMPTY;
            }else if(v == "light"){
                board[i][j] = WHITE;
            }else{
                board[i][j] = BLACK;
            }
        }
    }

    return board;
}