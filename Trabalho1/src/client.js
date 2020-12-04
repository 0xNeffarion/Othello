const SERVER_PORT = 8008;
const SERVER = "twserver.alunos.dcc.fc.up.pt";
const SERVER_URL = "http://" + SERVER +  ":" + SERVER_PORT + "/";
const GRUPO = "57";

var currentGameInfo = null;
var utilizador = null;
var gameStarted = false;
var winner = null;

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

class GameInfo {

    constructor(id, color, updateEvent){
        this.id = id;
        this.color = color;
        this.updateEvent = updateEvent;
    }

    getUpdateEvent(){
        return this.updateEvent;
    }

    getColor(){
        return (this.color == "light" ? WHITE : BLACK);
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

const sendRequest = async function(method, key, data){
    var result = await fetch(SERVER_URL + key, {
            method: method,
            body: data 
        })
        .then(response => response.json())
        .then(json => {
            if(json.error != undefined){
                return Promise.reject(json);
            }

            return json;
        })
        .catch(err => err);

    if(result != undefined && result != null && !isError(result)){
        return Object.values(result);
    }

    return result;
}

const isError = function(data){
    return data != undefined && data.error != undefined && data.error != null;
}

const errorMsg = function(data){
    return data.error;
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
    var update = new Update(data.board, data.turn);

    console.log("Received update: " + event.data);
    if(data.winner != undefined){
        showPopup("O jogo acabou!\nVencedor: " + data.winner)
    }

    var turn = update.getTurn();

    if(!gameStarted){
        gameStarted = true;
        document.getElementById("novo_jogo_msg").innerText = "";
        playerStartGame(update.getRealBoard(), turn);
    }else{
        updateBoard(update);
    }
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

const loadClient = async function(){
    document.getElementById("btnLogin").addEventListener("click", async function() { await register(); });
    document.getElementById("btnLogout").addEventListener("click", async function() { await logout(); });
    
    await fetchRanking();
}

const fetchRanking = async function(){
    const key = 'ranking';
    var req = await sendPOST(key, '{}');
    if(req == undefined || isError(req)){
        console.log(errorMsg(req));
        return;
    }

    var resultado = req[0];
    var tabela = document.getElementById(key);
    var tbody = tabela.getElementsByTagName("tbody")[0];
    var index = 0;
    for(var i = 0; i < resultado.length; i++){
        var pr = new Ranking(resultado[i]);
        if(pr != null && pr != undefined){
            tbody.appendChild(buildRankTable(index + 1, pr));
        }

        index++;
    }
}

const buildRankTable = function(index, ranking){
    var row = document.createElement("tr");
    var rowIndex = document.createElement("th");
    var val_nick = document.createElement("td");
    var val_games = document.createElement("td");
    var val_vict = document.createElement("td");

    rowIndex.innerText = index;
    val_nick.innerText = ranking.getNick();
    val_games.innerText = ranking.getGames();
    val_vict.innerText = ranking.getVictories();

    row.appendChild(rowIndex);
    row.appendChild(val_nick);
    row.appendChild(val_vict);
    row.appendChild(val_games);

    return row;
}

const register = async function(){
    console.log("Loggin in...");
    var nick = getUsername();
    var password = getPassword();
    var body = {
        nick: nick,
        pass: password
    }

    var json = JSON.stringify(body);
    var req = await sendPOST("register", json);
    if(isError(req)){
        document.getElementById("login_result").innerText = "Erro a fazer login!";
        document.getElementById("login_result_error").innerText = errorMsg(req);
        console.log("Error logging in. " + errorMsg(req));
    }else{
        document.getElementById("nome_util").innerText = nick;
        document.getElementById("authenticated").style.display = "block";
        document.getElementById("normal_login").style.display = "none";
        document.getElementById("login_result_error").style.display = "none";
        document.getElementById("login_result").style.display = "none";
        utilizador = new User(nick, password);
        console.log("Logged in as: " + nick);
    }

}

const logout = async function(){
    console.log("Logging out...");
    utilizador = null;
    document.getElementById("nome_util").innerText = "";
    document.getElementById("authenticated").style.display = "none";
    document.getElementById("normal_login").style.display = "block";
    document.getElementById("login_result").innerText = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    console.log("Done");
}

const join = async function(){
    console.log("Attempting to joing a game...");
    var arr = {
        group: GRUPO,
        nick: utilizador.getNickname(),
        pass: utilizador.getPassword(),
    };

    var res = await sendPOST("join", JSON.stringify(arr));
    if(res == null || isError(res)){
        if(errorMsg(res).includes("retry")){
            console.log("Join failed. Retrying...");

            await sleep(2000);
            return await join();
        }

        console.log(errorMsg(res));
        return null;
    }

    var id = res[0];
    var color = res[1];
    var event = setupEvent("update", "game=" + id + "&nick=" + utilizador.getNickname(), function(e) { updateGameEvent(e); });
 
    console.log("Game join request successful, waiting for opponent. ID: " + id);
    return new GameInfo(id, color, event);
}

const getUsername = function(){
    var username = document.getElementById("username");
    return username.value;
}

const getPassword = function(){
    var password = document.getElementById("password");
    return password.value;
}

const playDisc = async function(row, col){
    console.log("Playing disc at: (row, col)(" + row +  ", " + col + ")");
    var move = {
        row: row,
        column: col
    };

    var data = {
        nick: utilizador.getNickname(),
        pass: utilizador.getPassword(),
        game: currentGameInfo.getID(),
        move: move
    };

    var result = await sendPOST("notify", JSON.stringify(data));
}