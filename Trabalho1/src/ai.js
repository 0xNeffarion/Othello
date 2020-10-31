// MINIMAX CONFIG
const MAX_DEPTH = 3;
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

const copyGame = function(){
    return [...JOGO];
}

const cpuPlay = function(TABULEIRO, cpuColor) {
    var JOGO_TMP = [...TABULEIRO];
    var mm = minimax(JOGO_TMP, MAX_DEPTH, cpuColor);
    var coord = mm.getCoordenada();
    
    return coord;
}

const minimax = function(TABULEIRO, depth, player){
    if(depth <= 0 || isFull(TABULEIRO)){
        return new Result(null, null, heuristic(TABULEIRO, player));
    }

    var value;
    if(player === MAX){
        var children = getChildren(TABULEIRO, player);
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            value = resultMax(child, minimax(child.getTabuleiro(), depth - 1, MIN));
        }

        return value;
    }else if(player === MIN){
        var children = getChildren(TABULEIRO, player);
        for(var i = 0; i < children.length; i++){
            var child = children[i];
            value = resultMin(child, minimax(child.getTabuleiro(), depth - 1, MAX));
        }

        return value;
    }
}

const resultMax = function(result1, result2){
    if(result1 == null || result1 == undefined){
        return result2;
    }

    if(result2 == null || result1 == undefined){
        return result1;
    }

    if(result1.getPontos() > result2.getPontos()){
        return result1;
    }

    return result2;
}

const resultMin = function(result1, result2){
    if(result1 == null || result1 == undefined){
        return result2;
    }

    if(result2 == null || result1 == undefined){
        return result1;
    }

    if(result1.getPontos() < result2.getPontos()){
        return result1;
    }

    return result2;
}

const getChildren = function(TABULEIRO, color){
    var nodes = [];

    var PLACEHOLDER_TAB = [...TABULEIRO];
    clearPlaceholders(PLACEHOLDER_TAB);
    setPlaceholders(PLACEHOLDER_TAB, color);

    for(var r = 0; r < ROWS; r++){
        for(var c = 0; c < COLS; c++){
            if(TABULEIRO[r][c] === PLACEHOLDER){
                var JOGO_COPY = [...PLACEHOLDER_TAB];
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