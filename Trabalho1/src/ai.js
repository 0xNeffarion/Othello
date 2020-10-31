// MINIMAX CONFIG
const MAX_DEPTH = 2;
const MAX = BLACK;
const MIN = WHITE;

class Result {
    constructor(tabuleiro, coord, pontos){
        this.tabuleiro = tabuleiro;
        this.coordenada = coord;
        this.pontos = pontos;
    }

    getTabuleiro() {
        return this.tabuleiro;
    }

    getCoordenada() {
        return this.coordenada;
    }

    getPontos() {
        return this.pontos;
    }

    setTabuleiro(tabuleiro){
        this.tabuleiro = tabuleiro;
    }

    setCoordenada(coord){
        this.coordenada = coord;
    }

    setPontos(pontos){
        this.pontos = pontos;
    }

}

class Move {
    constructor(id, point, player, score){
        this.id = id;
        this.point = point;
        this.score = score;
        this.player = player;
    }

    getScore(){
        return this.score;
    }

    getPlayer(){
        return this.player;
    }

    getID(){
        return this.id;
    }

    getPoint(){
        return this.point;
    }

}


const cpuPlay = function(TABULEIRO, cpuColor) {
    var JOGO_TMP = copyTable(TABULEIRO);
    var moves = new Array();
    var mm = minimax(JOGO_TMP, MAX_DEPTH, cpuColor, moves);
    console.log(mm);
}

const minimax = function(tabuleiro, depth, player, moves){
    if(depth <= 0){
        return heuristic(tabuleiro, player);
    }

    var value;
    if(player === MAX){
        var children = getChildren(tabuleiro, player);
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            moves.push(new Move(createUUID(), child.getCoordenada(), MAX, child.getPontos()));
            value = Math.max(child.getPontos(), minimax(child.getTabuleiro(), depth - 1, MIN, moves));
        }

        return value;
    }else if(player === MIN){
        var children = getChildren(tabuleiro, player);
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            value = Math.min(child.getPontos(), minimax(child.getTabuleiro(), depth - 1, MAX, moves));
            moves.push(new Move(createUUID(), child.getCoordenada(), MIN, child.getPontos()));
        }

        return value;
    }
}

const getChildren = function(TABULEIRO, color){
    var nodes = [];

    var PLACEHOLDER_TAB = copyTable(TABULEIRO);

    for(var r = 0; r < ROWS; r++){
        for(var c = 0; c < COLS; c++){
            if(PLACEHOLDER_TAB[r][c] === PLACEHOLDER){
                var JOGO_COPY = copyTable(PLACEHOLDER_TAB);
                var result = abstractPlace(JOGO_COPY, color, r, c);
                nodes.push(result);
            }
        }
    }

    return nodes;
}

const abstractPlace = function(TABULEIRO, color, row, col) {
    var point = new Point(row,col);
    fillPecas(TABULEIRO, row, col, color);
    var value = heuristic(TABULEIRO, color);
    clearPlaceholders(TABULEIRO);
    setPlaceholders(TABULEIRO, color);
    return new Result(TABULEIRO,point,value);
}

const countPoints = function(TABULEIRO, color) {
    var count = 0;
    for(var r = 0; r < ROWS; r++){
        for(var c = 0; c < COLS; c++){
            if(TABULEIRO[r][c] === color){
                count += 1;
            }
        }
    }

    return count;
}

const heuristic = function(TABULEIRO, color) {
    var myScore = countPoints(TABULEIRO, color);
    var opponentScore = countPoints(TABULEIRO, enemy(color));
    return myScore - opponentScore;
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }