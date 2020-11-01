// MINIMAX CONFIG
const MAX_DEPTH = 3;
const MAX = BLACK;
const MIN = WHITE;

const CPU_SLEEP_MS = 1000;

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

}

const cpuPlay = function(TABULEIRO, cpuColor) {
    return findBestMove(TABULEIRO, cpuColor);
}

const findBestMove = function(TABULEIRO, color){
    var best = -10000;
    var bestPlay = null;
    var children = getChildren(TABULEIRO, color);
    children = shuffle(children);

    for(var i = 0; i < children.length; i++){
        var c = children[i];
        var copy = copyTable(TABULEIRO);
        var score = MINIMAX(copy, MAX_DEPTH, color);

        if(bestPlay == null){
            best = score;
            bestPlay = c.getCoordenada();
        }

        if(Math.abs(score) > best){
            best = score;
            bestPlay = c.getCoordenada();
        }
    }

    return bestPlay;
}

const MINIMAX = function(TABULEIRO, depth, player){
    if(depth <= 0){
        return heuristic(TABULEIRO, player);
    }

    var value;
    var children = getChildren(TABULEIRO, player);
    if(player === MAX){
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            value = Math.max(child.getPontos(), MINIMAX(child.getTabuleiro(), depth - 1, MIN));
        }
    }else if(player === MIN){
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            value = Math.min(child.getPontos(), MINIMAX(child.getTabuleiro(), depth - 1, MAX));
        }
    }

    return value;
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
    setPlaceholders(TABULEIRO, color);
    var point = new Point(row,col);

    if(canPlay(TABULEIRO)){
        fillPecas(TABULEIRO, row, col, color);
    }

    return new Result(TABULEIRO,point, heuristic(TABULEIRO, color));
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

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}